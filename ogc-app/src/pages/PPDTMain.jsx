import React, { useEffect, useState } from 'react';
import Tab from '../components/Tab';
import axios from 'axios';

const PPDTMain = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/ppdt', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setPosts(response.data.PPDT_posts);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex mt-7 flex-wrap gap-6 items-center justify-center">
            {posts.map((item, index) => (
                <Tab key={index} link={item.id} name={item.name} />
            ))}
        </div>
    );
};

export default PPDTMain;
