import React, { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import Toycard from '../Components/Toycard';

const AllToys = () => {
    const loaderData = useLoaderData();

    const [toys, setToys] = useState(loaderData || []);
    const [loading, setLoading] = useState(false);

    const searchTimeout = useRef(null); // ✅ IMPORTANT

    useEffect(() => {
        document.title = "All Toys Page - Toy Store";
    }, []);

    // ✅ FILTER FUNCTION
    const handleFilter = async (type) => {
        if (type === 'default') {
            setToys(loaderData || []);
            return;
        }

        let url = '';
        if (type === 'high') url = 'http://localhost:5000/toys/filter/high';
        if (type === 'low') url = 'http://localhost:5000/toys/filter/low';

        if (!url) return;

        setLoading(true);

        try {
            const res = await fetch(url);
            const data = await res.json();
            setToys(data || []);
        } catch (err) {
            console.error('Filter failed:', err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ NEW SAFE SEARCH FUNCTION (NO DOUBLE CALL)
    const handleSearch = (text) => {

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        setLoading(true);

        searchTimeout.current = setTimeout(async () => {

            if (!text.trim()) {
                setToys(loaderData);
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`http://localhost:5000/toys/search/${text}`);
                const result = await res.json();

                // ✅ Remove dupes by _id (extra safety)
                const unique = Array.from(
                    new Map(result.map(item => [item._id, item])).values()
                );

                setToys(unique);

            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }

        }, 400);
    };

    // ✅ CLEANUP
    useEffect(() => {
        return () => {
            if (searchTimeout.current) {
                clearTimeout(searchTimeout.current);
            }
        };
    }, []);

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mt-10">All Toys</h1>

            <div className="flex justify-between items-center my-6">
                <div className="flex-1">
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="search"
                            placeholder="Search Toy..."
                            onChange={(e) => handleSearch(e.target.value)}
                            className="grow"
                        />
                    </label>
                </div>

                {/* FILTER */}
                <div className="dropdown dropdown-end">
                    <button tabIndex={0} className="btn px-5 m-1">Filter</button>
                    <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-sm">
                        <li><button onClick={() => handleFilter('default')}>Default</button></li>
                        <li><button onClick={() => handleFilter('high')}>Price High to Low</button></li>
                        <li><button onClick={() => handleFilter('low')}>Price Low to High</button></li>
                    </ul>
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 gap-6 my-10 md:grid-cols-3 lg:grid-cols-4">

                {loading && (
                    <div className="text-center col-span-full py-10">
                        <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
                        <div className="mt-2 text-gray-600">Loading toys...</div>
                    </div>
                )}

                {!loading && toys.length === 0 && (
                    <p className="text-center col-span-full text-gray-500">
                        No toys found 😢
                    </p>
                )}

                {!loading && toys.length > 0 &&
                    toys.map((toy) => <Toycard key={toy._id} toy={toy} />)
                }

            </div>
        </div>
    );
};

export default AllToys;
