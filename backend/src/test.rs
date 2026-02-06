#![cfg(test)]
use super::*;
use soroban_sdk::{Env, testutils::{Address as _, Ledger}, token};

#[test]
fn test_donate_and_certificate() {
    let env = Env::default();
    env.mock_all_auths();

    // 1. Initialize Contract
    let contract_id = env.register_contract(None, GreenFiContract);
    let client = GreenFiContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.initialize(&admin);

    // 2. Setup Token & User
    // We need a token to donate. In tests, we can register a stellar asset contract.
    let token_admin = Address::generate(&env);
    let token_contract_id = env.register_stellar_asset_contract(token_admin.clone());
    let token_client = token::Client::new(&env, &token_contract_id);
    let token_address = token_contract_id;

    let user = Address::generate(&env);
    
    // Mint tokens to user
    token_client.mint(&user, &10_000_000_000); // 1000 XLM

    // 3. User Donates < 100 XLM (e.g. 50 XLM)
    // 50 XLM = 500,000,000 stroops
    client.donate(&token_address, &user, &500_000_000);

    // Check Certificate -> Standard
    let cert = client.get_certificate(&user);
    assert_eq!(cert, symbol_short!("Standard"));

    // Check Contract Balance
    assert_eq!(token_client.balance(&contract_id), 500_000_000);

    // 4. User Donates more to reach > 100 XLM
    // Donate another 60 XLM. Total = 110 XLM.
    client.donate(&token_address, &user, &600_000_000);

    // Check Certificate -> Gold
    let cert_gold = client.get_certificate(&user);
    assert_eq!(cert_gold, symbol_short!("Gold"));

    // 5. Check Total Donation Global
    // Implementation details are private, but we can verify through behavior or getters if we added them.
    // For now, certificate status proves state update.
}

#[test]
fn test_withdraw() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, GreenFiContract);
    let client = GreenFiContractClient::new(&env, &contract_id);

    let admin = Address::generate(&env);
    client.initialize(&admin);

    let token_admin = Address::generate(&env);
    let token_contract_id = env.register_stellar_asset_contract(token_admin);
    let token_client = token::Client::new(&env, &token_contract_id);
    let token_address = token_contract_id;

    let donor = Address::generate(&env);
    token_client.mint(&donor, &1_000_000_000);

    // Donate
    client.donate(&token_address, &donor, &1_000_000_000);

    // Withdraw to Admin
    let initial_admin_balance = token_client.balance(&admin);
    client.withdraw(&token_address, &1_000_000_000, &admin);
    
    let final_admin_balance = token_client.balance(&admin);
    assert_eq!(final_admin_balance - initial_admin_balance, 1_000_000_000);
}

#[test]
#[should_panic(expected = "Amount must be positive")]
fn test_negative_donation() {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register_contract(None, GreenFiContract);
    let client = GreenFiContractClient::new(&env, &contract_id);
    
    let admin = Address::generate(&env);
    client.initialize(&admin);

    let token_address = Address::generate(&env); // Dummy
    let user = Address::generate(&env);

    client.donate(&token_address, &user, &-5);
}
