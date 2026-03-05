import React from 'react'
import AppLayout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'

export default function index() {
    return (
        <>
            <AppLayout>
                <Head title="Blogs" />
                <h1>hello from admin blog index</h1>
            </AppLayout>
        </>
    )
}