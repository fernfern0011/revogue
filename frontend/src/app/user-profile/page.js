import styles from "../../../styles/Home.module.css";
import { ProfileUpload } from "../../../components/ProfileUpload";

const UserProfilePage = () => {
    return (
        <div className={styles.container}>
            <h1>Uesr Profile Page</h1>
            <main className={styles.main}>
                <div className={styles.grid}>
                    <ProfileUpload />
                </div>
            </main>
        </div>
    )
}

export default UserProfilePage;