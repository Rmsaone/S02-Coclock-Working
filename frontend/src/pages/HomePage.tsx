import React from 'react';

import styles from './HomePage.module.scss'


const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.contentTitle}>Qui sommes-nous ?</h1>
            <p className={styles.contentParagraph}>
                Wait a minute, Doc. What are you talking about? What happens to us in the future? What do we become
                assholes
                or something? Roads? Where we're going we don't need roads. No no no no no, Marty, both you and Jennifer
                turn out fine. It's your kids, Marty, something has got to be done about your kids. Hello, hello,
                anybody
                home? Think, McFly, think. I gotta have time to get them re-typed. Do you realize what would happen if I
                hand in my reports in your handwriting. I'll get fired. You wouldn't want that to happen would you?
                Would
                you? Excuse me.</p>
            <br />
            <p className={styles.contentParagraph}>Let him go, Biff, you're drunk. Doc, is that a de- Hey I'm talking to you, McFly,
                you Irish bug. Hey
                c'mon,
                I had to change, you think I'm going back in that zoot suit? The old man really came through it worked.
                Does
                your mom know about tomorrow night?</p>
            <br />
            <p className={styles.contentParagraph}>
                George. I haven't Oh, I've been so worried about you ever since you ran off the other night. Are you
                okay?
                I'm sorry I have to go. Isn't he a dream boat? Of course I do. Just a second, let's see if I could find
                it.
                Hey I'm talking to you, McFly, you Irish bug.
            </p>
        </div>
    );
};

export default HomePage;
