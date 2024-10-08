use serde::{Deserialize, Serialize};
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct CreateProposalMsg {
 pub title: String,
 pub description: String,
 pub image_url: String,
 pub expires_at: u64,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct VoteMsg {
 pub proposal_id: u64,
 pub vote: bool,
}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct QueryProposalMsg {
 pub proposal_id: u64,
}