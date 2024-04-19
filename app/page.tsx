'use client'
import styles from "./page.module.css";

import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Password from "../components/Password";

export default function Home() {

  const [isLoading, setLoading] = useState(true);

    useEffect(() => {
            setLoading(false);
    }, []);

  return (
      <main className={styles.main}>
        {isLoading ?
            <Loading/>
        : <Password/>}
      </main>
  );
}
