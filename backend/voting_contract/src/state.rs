STATE                                                                                                                                                         use cosmwasm_std::{StdResult, Storage};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use cosmwasm_storage::{singleton, singleton_read};

// Define a constant for the key used in storage
pub const STATE_KEY: &[u8] = b"state";

// Proposal structure
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Proposal {
    pub id: u64,
    pub title: String,
    pub description: String,
    pub yes_votes: u64,
    pub no_votes: u64,
    pub image_url: String,
    pub status: ProposalStatus,
    pub expires_at: u64,
    pub image_url:String,
}

// Enum for Proposal status (Open/Closed)
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub enum ProposalStatus {
    Open,
    Closed,
}

// State structure that holds proposals
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub proposals: Vec<Proposal>,
}

// Helper function to save the state
pub fn save_state(storage: &mut dyn Storage, state: &State) -> StdResult<()> {
    // Use singleton to save the state under the provided key
    singleton(storage, STATE_KEY).save(state)
}

// Helper function to load the state
pub fn load_state(storage: &dyn Storage) -> StdResult<State> {
    // Use singleton_read to read the state from storage
    singleton_read(storage, STATE_KEY).load()
}