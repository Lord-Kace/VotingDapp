import React, { useState } from "react";
import Notification from "./Notification";
const ProposalCreate = ({ client }) => {
 const [title, setTitle] = useState("");
 const [description, setDescription] = useState("");
 const [imageUrl, setImageUrl] = useState(""); // New state for image URL
 const [notification, setNotification] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const createProposal = async () => {
 if (!title || !description || !imageUrl) {
 setNotification("Title, description, and image URL are required.");
 return;
 }
 setIsLoading(true);
 try {
 const msg = {
 create_proposal: {
 title,
 description,
 image_url: imageUrl, // Pass the image URL
 },
 };
 const tx = await client.tx.broadcast([msg], {
 gasLimit: 200_000,
 memo: "Create proposal",
 });
 console.log("Proposal created: ", tx);
 setNotification("Proposal created successfully.");
 setTitle("");
 setDescription("");
 setImageUrl(""); // Reset image URL
 } catch (error) {
 setNotification(`Error creating proposal: ${error.message}`);
 }
 setIsLoading(false);
 };
 return (
 <div>
 <h2>Create a Proposal</h2>
 <input
 type="text"
 placeholder="Title"
 value={title}
 onChange={(e) => setTitle(e.target.value)}
 />
 <textarea
 placeholder="Description"
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 />
 <input
 type="text"
 placeholder="Image URL"
 value={imageUrl}
 onChange={(e) => setImageUrl(e.target.value)} // Handle image URL
 />
 <button onClick={createProposal} disabled={isLoading}>
 {isLoading ? "Creating..." : "Create"}
 </button>
 {notification && <Notification message={notification} />}
 </div>
 );
};
export default ProposalCreate;