import React, { useState, useEffect } from 'react'
import databaseService from '../appwrite/appWriteDatabase'
import { Container, PostCard } from '../components/index'

function AllPostPage() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        databaseService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPostPage