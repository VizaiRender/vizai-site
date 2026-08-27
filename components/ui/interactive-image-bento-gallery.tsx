"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  AnimatePresence,
} from "motion/react"
import { X } from "lucide-react"
import { useOnScreen } from "@/components/ui/use-on-screen";

// Defines the structure for each image item in the gallery
export type ImageItem = {
  id: number | string
  title: string
  desc: string
  url: string
  span: string // Tailwind CSS grid span classes (e.g., "md:col-span-2")
  position?: string // Optional object-position class (e.g., "object-right")
}

// Defines the props for the main gallery component
interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[]
  title: string
  description: string
  id?: string
}

// Animation variants for the container to stagger children
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Animation variants for each gallery item
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Main gallery component
const InteractiveImageBentoGallery: React.FC<
  InteractiveImageBentoGalleryProps
> = ({ imageItems, title, description, id }) => {
  const [dragConstraint, setDragConstraint] = useState(0)
  const [isInteracting, setIsInteracting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const direction = useRef(-1) // -1 for left, 1 for right
  // Fora da tela a tira não precisa deslizar: o `x.set` a cada quadro obriga
  // o navegador a recompor uma faixa com 25 imagens grandes, para sempre.
  const naTela = useOnScreen(targetRef)

  useAnimationFrame((t, delta) => {
    if (!naTela.current) return
    if (!isInteracting && dragConstraint < 0) {
      let currentX = x.get()
      let newX = currentX + (delta * 0.03 * direction.current)
      
      if (newX <= dragConstraint) {
        newX = dragConstraint
        direction.current = 1
      } else if (newX >= 0) {
        newX = 0
        direction.current = -1
      }
      x.set(newX)
    }
  })

  // Calculate the draggable area constraint
  useEffect(() => {
    const calculateConstraints = () => {
      if (gridRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const gridWidth = gridRef.current.scrollWidth
        // The '- 32' provides some padding at the end
        const newConstraint = Math.min(0, containerWidth - gridWidth - 32)
        setDragConstraint(newConstraint)
      }
    }

    calculateConstraints()
    window.addEventListener("resize", calculateConstraints)
    // Pequeno delay pra garantir que as imagens carregaram
    setTimeout(calculateConstraints, 500)
    return () => window.removeEventListener("resize", calculateConstraints)
  }, [imageItems])

  // Framer Motion scroll animations
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.2, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.05], [10, 0])

  return (
    <section
      id={id}
      data-track-section="galeria"
      ref={targetRef}
      className="relative w-full overflow-hidden bg-transparent py-16 sm:py-24"
    >
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-4 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-xl" style={{ color: "var(--foreground-muted)" }}>
          {description}
        </p>
      </motion.div>

      <div
        ref={containerRef}
        className="relative mt-12 w-full cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
      >
        <motion.div
          className="w-max"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: dragConstraint, right: 0 }}
          dragElastic={0.05}
          onDragStart={() => setIsInteracting(true)}
          onDragEnd={() => setIsInteracting(false)}
        >
          <motion.div
            ref={gridRef}
            className="grid grid-rows-2 auto-cols-[minmax(15rem,1fr)] grid-flow-col-dense gap-4 px-4 md:px-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
          >
            {imageItems.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cn(
                  "group relative flex h-full min-h-[15rem] w-full min-w-[15rem] items-end overflow-hidden rounded-xl border border-white/10 bg-card p-4 shadow-sm transition-shadow duration-300 ease-in-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  item.span,
                )}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {item.url ? (
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    draggable={false}
                    className={cn(
                      "object-cover transition-transform duration-500 group-hover:scale-105",
                      item.position || "object-center"
                    )}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 dark:bg-white/5 transition-transform duration-500 group-hover:scale-105">
                    <span className="opacity-40 font-mono text-sm font-medium">Slot {item.id}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default InteractiveImageBentoGallery
