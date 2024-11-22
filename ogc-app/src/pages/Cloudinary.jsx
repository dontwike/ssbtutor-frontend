import React, { useState } from 'react';
import axios from 'axios';

const Cloudinary = () => {
    const [files, setFiles] = useState(null);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!files) {
            alert("Please select files to upload.");
            return;
        }

        const formData = new FormData();
        Array.from(files).forEach(file => {
            formData.append("images", file);
        });

        try {
            const response = await axios.post("http://localhost:8080/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Upload successful:", response.data);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Upload Your Files</h3>
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="formFile">Choose files</label>
                                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" onChange={handleFileChange} id="formFile" name="images" multiple />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-success">Upload</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cloudinary;
