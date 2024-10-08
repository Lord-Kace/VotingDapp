use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Election is not active")]
    ElectionNotActive,

    #[error("You have already voted in this election")]
    AlreadyVoted,

    #[error("Candidate '{0}' does not exist for election ID '{1}'")]
    CandidateDoesNotExist(String, u64), // Accepts candidate name and election ID

    #[error("Election with ID '{0}' does not exist")]
    ElectionDoesNotExist(u64), // Accepts election ID

    #[error("Unauthorized action")]
    Unauthorized,

    // Additional custom errors can be defined here
}
