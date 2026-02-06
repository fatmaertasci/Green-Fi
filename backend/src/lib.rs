#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Symbol, symbol_short, token};

#[contracttype]
pub enum DataKey {
    Admin,
    TotalDonation, // Total funds collected
    UserDonation(Address), // How much a specific user donated
}

#[contract]
pub struct GreenFiContract;

mod test;

#[contractimpl]
impl GreenFiContract {
    // Initialize the contract with an admin
    pub fn initialize(e: Env, admin: Address) {
        if e.storage().instance().has(&DataKey::Admin) {
            panic!("Already initialized");
        }
        e.storage().instance().set(&DataKey::Admin, &admin);
        e.storage().instance().set(&DataKey::TotalDonation, &0i128);
    }

    // Donate function: Transfers tokens from donor to contract
    pub fn donate(e: Env, token_address: Address, donor: Address, amount: i128) {
        donor.require_auth();
        if amount <= 0 {
            panic!("Amount must be positive");
        }

        // Transfer funds to contract
        let client = token::Client::new(&e, &token_address);
        client.transfer(&donor, &e.current_contract_address(), &amount);

        // Update global total
        let mut total: i128 = e.storage().instance().get(&DataKey::TotalDonation).unwrap_or(0);
        total += amount;
        e.storage().instance().set(&DataKey::TotalDonation, &total);

        // Update user total
        let key = DataKey::UserDonation(donor.clone());
        let mut user_total: i128 = e.storage().persistent().get(&key).unwrap_or(0);
        user_total += amount;
        e.storage().persistent().set(&key, &user_total);

        // Extend data lifetime
        e.storage().persistent().extend_ttl(&key, 17280, 17280); 
    }

    // Get certificate status based on donation amount
    pub fn get_certificate(e: Env, user: Address) -> Symbol {
        let key = DataKey::UserDonation(user);
        let user_total: i128 = e.storage().persistent().get(&key).unwrap_or(0);

        // 100 XLM = 1,000,000,000 stroops
        let gold_threshold = 1_000_000_000; 
        let standard_threshold = 1;

        if user_total >= gold_threshold {
            symbol_short!("Gold")
        } else if user_total >= standard_threshold {
            symbol_short!("Standard")
        } else {
            symbol_short!("None")
        }
    }

    // Withdraw funds (Admin only)
    pub fn withdraw(e: Env, token_address: Address, amount: i128, to: Address) {
        let admin: Address = e.storage().instance().get(&DataKey::Admin).expect("Not initialized");
        admin.require_auth();

        let client = token::Client::new(&e, &token_address);
        client.transfer(&e.current_contract_address(), &to, &amount);
    }
}
