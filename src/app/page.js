import Image from "next/image";

import styles from "./page.module.css";
import { MainLayout } from "@/components/main-layout";

export default function Home() {
  return (
    <main className={styles.main}>
      <MainLayout />
    </main>
  );
}
