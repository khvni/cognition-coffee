import { type Variants } from "framer-motion"

export const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  } satisfies Variants,
  item: {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } },
  } satisfies Variants,
}
