import React, { useEffect } from "react";
import { gsap } from "gsap";
import Split from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerInit() {
    useEffect(() => {
        const reveal = Array.from(document.querySelectorAll('.reveal'));

        reveal.forEach((el) => {
            gsap.from(el, {
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 20%",
                    end: "bottom 20%",
                    scrub: true
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
            if (allChars.length) gsap.killTweensOf(allChars);
        };
    }, []);

    return null;
}
