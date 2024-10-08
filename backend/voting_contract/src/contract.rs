CONTRACT                                                                                                                       use cosmwasm_std::{DepsMut, Env, MessageInfo, Response, StdResult, StdError, Uint128};
use cosmwasm_storage::{singleton, singleton_read};  // Ensure you have the correct storage helpers
use crate::state::{load_state, save_state, Proposal, ProposalStatus, State};  // Import State, and correct helper functions from state module
use crate::cosmwasm_std::StdError::ContractError;  // Correctly import ContractError (ensure the error.rs file exists)

// Constants
pub const STATE_KEY: &[u8] = b"state";

// Function to create a proposal
pub fn create_proposal(
    deps: DepsMut,  // Ensure you're using DepsMut for mutable storage access
    env: Env,
    info: MessageInfo,
    title: String,
    description: String,
    image_url: String,
    expires_at: u64,
) -> StdResult<Response> {
    let mut state = load_state(deps.storage)?;  // Load state using correct helper

    let proposal_id = state.proposals.len() as u64 + 1;
    let proposal = Proposal {
        id: proposal_id,
        title,
        description,
        yes_votes: 0,
        no_votes: 0,
        image_url,
        status: ProposalStatus::Open,
        expires_at,
    };

    state.proposals.push(proposal);
    save_state(deps.storage, &state)?;  // Save state using correct helper

    Ok(Response::default())
}

// Function to vote on a proposal
pub fn vote(
    deps: DepsMut,  // Ensure you're using DepsMut for mutable storage access
    env: Env,
    info: MessageInfo,
    proposal_id: u64,
    vote: bool,
) -> Result<Response, ContractError> {  // Ensure the return type includes the correct error type
    let mut state = load_state(deps.storage)?;  // Load state using the helper function

    let proposal = state
        .proposals
        .iter_mut()
        .find(|p| p.id == proposal_id)
        .ok_or(ContractError::ProposalNotFound)?;  // Return correct custom error

    if proposal.status == ProposalStatus::Closed {
        return Err(ContractError::ProposalClosed.into());
    }

    if vote {
        proposal.yes_votes += 1;
    } else {
        proposal.no_votes += 1;
    }

    save_state(deps.storage, &state)?;  // Save state after the vote is recorded

    Ok(Response::default())
}

// Function to query a specific proposal
pub fn query_proposal(deps: DepsMut, proposal_id: u64) -> StdResult<Proposal> {
    let state = load_state(deps.storage)?;  // Load state using the helper function

    let proposal = state
        .proposals
        .iter()
        .find(|p| p.id == proposal_id)
        .ok_or(ContractError::ProposalNotFound)?;  // Handle proposal not found

    Ok(proposal.clone())
}