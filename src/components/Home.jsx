// import { useEffect, useState, useMemo, useRef } from 'react'
// import styles from './Home.module.css'
// import frogImage from '../images/frog-plush.png'
// import speechBubble from '../images/speech-bubble.png'
// import { useLocation } from 'react-router-dom'

// function Home({ todoList }) {

//     const location = useLocation();

//     const firstMessage = "Oh hey, there you are! I saved your favorite spot, and your tasks too. Don't worry about remembering them; whenever you're ready, I'll be here to remind you!";
//     const messages = useMemo(() => [
//         "Holy smokes, you're all caught up! Nice job (:",
//         "There are just a few tasks left, I'm rootin' for ya!",
//         "Looks like there's a lot to be done today! No biggie though, I'm here to help you stay on track (:",
//     ], []);

//     const [message, setMessage] = useState(firstMessage);
//     const hasVisited = useRef(JSON.parse(localStorage.getItem('hasVisited')) || false);
//     const firstRender = useRef(true);
//     const [hasNavigated, setHasNavigated] = useState(false);

//     useEffect(() => {
//         const storedHasNavigated = JSON.parse(localStorage.getItem('hasNavigated')) || false;
//         setHasNavigated(storedHasNavigated);
//     }, [location.pathname]); 

//     Detect first visit    
//     useEffect(() => {
//        if(!hasVisited.current) {
//          localStorage.setItem('hasVisited', JSON.stringify(true));
//          hasVisited.current = true;
//        }
//     }, []);

//     Mark navigation away from '/'
//     useEffect(() => {
//        if (!hasNavigated.current && location.pathname !== '/') {
//          hasNavigated.current = true;
//        }
//     }, [location.pathname, hasNavigated]);

//     Only show first message if user hasn't navigated away
//     useEffect(() => {
//         if (firstRender.current || !hasNavigated.current) {
//           firstRender.current = false;
//           return;
//         }

//         console.log(message);

//         if (todoList.length === 0) {
//             setMessage(messages[0]);
//         } else if (todoList.length <= 3) {
//             setMessage(messages[1]);
//         } else {
//             setMessage(messages[2]);
//         }

//         console.log("Updated message:", message);

//     }, [todoList, messages, message, hasNavigated]);

//     return (
//         <div className={styles.homeContainer}>
//             <div className={styles.speechBubbleContainer}>
//                 <img src={speechBubble} alt='Speech bubble' className={styles.speechBubble} />
//                 <div className={styles.speechText}>
//                     {message}                
//                 </div>
//             <img src={frogImage} alt='Frog' className={styles.frogImage} />
//             </div>
//         </div>
//     )
// }

// export default Home;

import { useEffect, useState, useMemo, useRef } from 'react'
import styles from './Home.module.css'
import frogImage from '../images/frog-plush.png'
import speechBubble from '../images/speech-bubble.png'
// import { useLocation } from 'react-router-dom'

function Home({ todoList }) {

//     const location = useLocation();

    const firstMessage = "Oh hey, there you are! I saved your favorite spot, and your tasks too. Don't worry about remembering them; whenever you're ready, I'll be here to remind you!";
//     const messages = useMemo(() => [
//         "Holy smokes, you're all caught up! Nice job (:",
//         "There are just a few tasks left, I'm rootin' for ya!",
//         "Looks like there's a lot to be done today! No biggie though, I'm here to help you stay on track (:",
//     ], []);

    const [message, setMessage] = useState(firstMessage);
//     const hasVisited = useRef(JSON.parse(localStorage.getItem('hasVisited')) || false);
//     const firstRender = useRef(true);
//     const [hasNavigated, setHasNavigated] = useState(false);

//     useEffect(() => {
//         const storedHasNavigated = JSON.parse(localStorage.getItem('hasNavigated')) || false;
//         setHasNavigated(storedHasNavigated);
//     }, [location.pathname]); 

//     Detect first visit    
//     useEffect(() => {
//        if(!hasVisited.current) {
//          localStorage.setItem('hasVisited', JSON.stringify(true));
//          hasVisited.current = true;
//        }
//     }, []);

//     Mark navigation away from '/'
//     useEffect(() => {
//        if (!hasNavigated.current && location.pathname !== '/') {
//          hasNavigated.current = true;
//        }
//     }, [location.pathname, hasNavigated]);

//     Only show first message if user hasn't navigated away
//     useEffect(() => {
//         if (firstRender.current || !hasNavigated.current) {
//           firstRender.current = false;
//           return;
//         }

//         console.log(message);

//         if (todoList.length === 0) {
//             setMessage(messages[0]);
//         } else if (todoList.length <= 3) {
//             setMessage(messages[1]);
//         } else {
//             setMessage(messages[2]);
//         }

//         console.log("Updated message:", message);

//     }, [todoList, messages, message, hasNavigated]);

    return (
        <div className={styles.homeContainer}>
            <div className={styles.speechBubbleContainer}>
                <img src={speechBubble} alt='Speech bubble' className={styles.speechBubble} />
                <div className={styles.speechText}>
                    {message}                
                </div>
            <img src={frogImage} alt='Frog' className={styles.frogImage} />
            </div>
        </div>
    )
}

export default Home;