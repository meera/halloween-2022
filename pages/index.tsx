import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { useRef, useState } from "react";
import useSound from 'use-sound';


const trigger_images = ["/clown.gif", "/hand.gif", "/horror-scary-hand.gif", "/it-clown.gif", 
"/scary-ghost-2.gif", "/scary-ghost-ghost.gif", "/angry-pumpkin.gif"];

const trigger_sound = ["/bigbang.wav", "/trigger-2.wav"];

export default function Home() {

  const [play, setPlay] = useState<boolean>(false)
  const [playBase, playbaseData] = useSound('/let-the-mystery-unfold.mp3',  {
    volume: 5,
    // `interrupt` ensures that if the sound starts again before it's
    // ended, it will truncate it. Otherwise, the sound can overlap.
    interrupt: true,
  });
  const [playTrigger1, playtrigger1Data] = useSound('/bigbang.wav' , {
    volume: 10,
    // `interrupt` ensures that if the sound starts again before it's
    // ended, it will truncate it. Otherwise, the sound can overlap.
    interrupt: true,
  });

  const [playTrigger2, playtrigger2Data] = useSound('/sound_79.mp3' , {
    volume: 10,
    // `interrupt` ensures that if the sound starts again before it's
    // ended, it will truncate it. Otherwise, the sound can overlap.
    interrupt: true,
  });
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR("/api/trigger", fetcher, {
    refreshInterval: 100,
  });
 

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  if (data) console.log("Data Trigger", data.trigger);

  async function handleClick() {

   setPlay(true);
  };
  if( !play ){
    return <button onClick={handleClick}> Play</button>
  }
  if (!data.trigger) {
    // Base Line
    playtrigger1Data.stop();
    playtrigger2Data.stop();
    playBase();
    return (
      <div className={styles.container}>
        <Head>
          <title>Halloween 2022</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main >
        <div style={{ position: 'relative', width: "100vw", height: '100vh' }}>
      <Image
        alt="Mountains"
        src="/pumpkin.gif"
        fill
        sizes="100vw"
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
        </main>
      </div>
    );
  } else {
    // Trigger
    playbaseData.stop();


    const chooseSound = Math.floor(Math.random() * 2);
    if (chooseSound == 0)
       playTrigger1();
    else 
       playTrigger2();

    const index = Math.floor(Math.random() * trigger_images.length);

    let imgsrc =  trigger_images[index];
    return (
      <div className={styles.container}>
        <Head>
          <title>Halloween 2022</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>

         

        <div style={{ position: 'relative', width: "100vw", height: '100vh' }}>
      <Image
        alt="Mountains"
        src={imgsrc}
        fill
        sizes="100vw"
        style={{
          objectFit: 'contain',
        }}
      />
    </div>
        </main>
      </div>
    );
  }
}
