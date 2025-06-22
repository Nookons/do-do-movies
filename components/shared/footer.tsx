'use client'
import React from "react";
import { Container } from "@/components/shared/container";
import Link from "next/link";
import {useUserStore} from "@/store/user";

const Footer = () => {
    const user = useUserStore(state => state.data)

    return (
        <footer className="text-foreground bg-secondary p-2 rounded-t-2xl mt-10 pb-4">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">About Page</h3>
                        <p className="text-sm text-foreground">
                            This page was powered by Nookon for show my developer skills but it&apos;s work well i hope
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="text-sm text-foreground space-y-2">
                            <li><Link href="/search" className="hover:text-primary">Movies</Link></li>
                            <li><Link href={`/profile/${user?.id || "none"}/favorite`} className="hover:text-primary">Favorites</Link></li>
                            <li><Link href={`/profile/${user?.id || "none"}/watched_list`} className="hover:text-primary">Watched movies</Link></li>
                            <li><Link href={`/profile/${user?.id || "none"}/watch_later`} className="hover:text-primary">Watch later</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Contact Me</h3>
                        <p className="text-sm text-foreground mb-4">
                            <Link className={`hover:text-primary`} href={`mailto:nookon@icloud.com`}>nookon@icloud.com</Link>
                             <br />
                            <Link className={`hover:text-primary`} href={`tel:+48608649243`}>+48 (608) 649-243</Link>
                        </p>
                    </div>
                </div>
                <div className="pt-6 text-center text-neutral-500 text-sm">
                    &copy; {new Date().getFullYear()} DO-DO-Movies. All rights reserved.
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
