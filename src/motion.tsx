import { useEffect, useRef, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'

const elements = { div: motion.create('div'), h2: motion.create('h2'), article: motion.create('article') }

export function FadeIn({ children, as = 'div', className, delay = 0, duration = 0.7, x = 0, y = 30 }: {
  children: ReactNode; as?: keyof typeof elements; className?: string; delay?: number; duration?: number; x?: number; y?: number
}) {
  const Element = elements[as]
  const reduced = useReducedMotion()
  return <Element className={className} initial={reduced ? false : { opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '50px', amount: 0 }}
    transition={{ delay: reduced ? 0 : delay, duration: reduced ? 0 : duration, ease: [0.25, 0.1, 0.25, 1] }}>{children}</Element>
}

export function Magnet({children}: {children: ReactNode}) {
  const area = useRef<HTMLDivElement>(null)
  const object = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    const el = object.current
    if (!area.current || !el || reduced) return
    const reset = () => { el.style.transition = 'transform .6s ease-in-out'; el.style.transform = '' }
    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !area.current || !el) return
      const rect = area.current.getBoundingClientRect()
      const dx = event.clientX - rect.left - rect.width / 2
      const dy = event.clientY - rect.top - rect.height / 2
      if (Math.abs(dx) > rect.width / 2 + 150 || Math.abs(dy) > rect.height / 2 + 150) return reset()
      el.style.transition = 'transform .3s ease-out'
      el.style.transform = 'translate3d(' + dx / 3 + 'px,' + dy / 3 + 'px,0)'
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', reset)
    return () => { window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', reset); reset() }
  }, [reduced])
  return <div ref={area}><div ref={object} className="will-change-transform">{children}</div></div>
}

function Character({letter, index, length, progress}: {letter:string;index:number;length:number;progress:MotionValue<number>}) {
  const opacity = useTransform(progress, [index / length, (index + 1) / length], [.2, 1])
  return <span className="relative"><span className="invisible">{letter}</span><motion.span className="absolute inset-0" style={{opacity}}>{letter}</motion.span></span>
}

export function AnimatedText({text}: {text:string}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const {scrollYProgress} = useScroll({target:ref,offset:['start 0.8','end 0.2']})
  const reduced = useReducedMotion()
  let index = 0
  return <p ref={ref} className="about-copy"><span className="sr-only">{text}</span><span aria-hidden="true">{reduced ? text : text.split(' ').map((word,i) => <span key={i}><span className="inline-block">{Array.from(word).map(letter => <Character key={index} letter={letter} index={index++} length={text.replaceAll(' ','').length} progress={scrollYProgress}/>)}</span>{' '}</span>)}</span></p>
}
