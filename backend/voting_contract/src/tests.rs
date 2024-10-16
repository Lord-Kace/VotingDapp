#[cfg(test)]
mod tests {
 use cosmwasm_std::{from_binary, Addr};
 use cosmwasm_std::testing::{mock_dependencies, mock_env, 
mock_info};
 use crate::contract::{instantiate, execute, query};
 use crate::msg::{InstantiateMsg, ExecuteMsg, QueryMsg, 
CandidateResponse};
 #[test]
 fn test_add_candidate() {
 let mut deps = mock_dependencies();
 let msg = InstantiateMsg {};
 let info = mock_info("creator", &[]);
 let _res = instantiate(deps.as_mut(), mock_env(), info, 
msg).unwrap();
 // Add a candidate
 let add_msg = ExecuteMsg::AddCandidate {
 name: "Alice".to_string(),
 description: "Blockchain enthusiast".to_string(),
 image_url: "https://example.com/alice.jpg".to_string(),
 };
 let info = mock_info("voter1", &[]);
 let _res = execute(deps.as_mut(), mock_env(), info, 
add_msg).unwrap();
 // Query candidates
 let query_msg = QueryMsg::GetCandidates {};
 let res = query(deps.as_ref(), mock_env(), 
query_msg).unwrap();
 let candidates: Vec<CandidateResponse> = 
from_binary(&res).unwrap();
 assert_eq!(candidates[0].name, "Alice");
 assert_eq!(candidates[0].votes, 0);
 }
 #[test]
 fn test_vote_for_candidate() {
 let mut deps = mock_dependencies();
 let msg = InstantiateMsg {};
 let info = mock_info("creator", &[]);
 let _res = instantiate(deps.as_mut(), mock_env(), info, 
msg).unwrap();
 // Add a candidate
 let add_msg = ExecuteMsg::AddCandidate {
 name: "Alice".to_string(),
 description: "Blockchain enthusiast".to_string(),
 image_url: "https://example.com/alice.jpg".to_string(),
 };
 let info = mock_info("voter1", &[]);
 let _res = execute(deps.as_mut(), mock_env(), info, 
add_msg).unwrap();
 // Vote for the candidate
 let vote_msg = ExecuteMsg::Vote { candidate_id: 0 };
 let info = mock_info("voter2", &[]);
 let _res = execute(deps.as_mut(), mock_env(), info, 
vote_msg).unwrap();
 // Query results
 let query_msg = QueryMsg::GetResults {};
 let res = query(deps.as_ref(), mock_env(), 
query_msg).unwrap();
 let candidates: Vec<CandidateResponse> = 
from_binary(&res).unwrap();
 assert_eq!(candidates[0].votes, 1);
 }
}
