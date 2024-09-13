import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function CreatePost() {
    const [form, setForm] = useState({
        user: "",
        content: "",
        image: "",
    });

    const navigate = useNavigate();

    //Retrieve the user from localStorage when the component mounts
    useEffect(() => {
        const savedUser = localStorage.getItem("name");
        if (savedUser) {
            setForm((prev) => ({
                ...prev,
                user: savedUser,
            }));
        } else {
            //Redirect to login if user is missing
            navigate("/login");
        }
    }, [navigate]);

    function updateForms(value) {
        setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    //Function to handle image file change
    async function handleImageChange(e) {
        const file = e.target.files[0]; // Fix index to 0
        if (file) {
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(",")[1]; // Remove the 'data:image/*;base64,' part
                    updateForms({ image: base64String });
                };
                reader.readAsDataURL(file); 
            } catch (error) {
                console.error("Error reading file:", error);
            }
        }
    }

    // Function to handle form submission
    async function onSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("jwt");

        const newPost = {
            user: form.user,
            content: form.content,
            image: form.image,
        };

        try {
            const response = await fetch("http://localhost:3001/post/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Post created:", result);

            // Reset form but keep the user
            setForm({ user: form.user, content: "", image: "" });

            // Redirect to home after post is created
            navigate("/");
        } catch (error) {
            window.alert(error);
        }
    }

    return (
        <div className="container">
            <h3 className="header">Create New Post</h3>
            <form onSubmit={onSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="user">User</label>
                    <input
                        type="text"
                        className="form-control"
                        id="user"
                        value={form.user}
                        disabled // Make the user field read-only
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <input
                        type="text"
                        className="form-control"
                        id="content"
                        value={form.content}
                        onChange={(e) => updateForms({ content: e.target.value })} // Corrected to updateForms
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="submit"
                        value="Create Post"
                        className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}
