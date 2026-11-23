import { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedText, FadeIn, Magnet } from './motion'
import './style.css'

const art = (kind: 'fig' | 'projs', index: number) => import.meta.env.BASE_URL + 'art/' + kind + '-' + index + '.webp'
const contact = 'https://github.com/LeeSanghyun1230'
const skills = [
  ['JS', '클릭이나 마우스 움직임에 반응하는 웹 화면을 만듭니다.'],
  ['Python', '알고리즘 문제를 풀며 해결 과정을 코드로 표현합니다.'],
  ['HTML', '제목과 본문, 이미지, 링크로 페이지의 구조를 잡습니다.'],
  ['CSS', '글자와 여백을 조정하고 화면 크기에 맞게 배치를 바꿉니다.']
]
const works = [
  { name: '포트폴리오 페이지', category: '개인 작업', url: contact + '/LeeSanghyun1230.github.io',
    description: '제가 배우는 기술과 참여한 프로젝트를 소개하는 개인 웹사이트입니다. 화면 구성을 기획하고 스크롤 효과와 반응형 레이아웃을 구현했습니다.',
    images: [] as string[][] },
  { name: 'Catch Recycling Game', category: '팀 프로젝트', url: contact + '/Catch-Recycling-Game',
    description: '15조 엔트리 팀원들과 만든 Java 게임입니다. 게임 개발에 필요한 기술을 조사하고 팀원들과 함께 게임 코드를 작성했습니다.',
    images: [['quiz', '분리수거 부활 퀴즈 화면'], ['play', '떨어지는 재활용품을 수거하는 게임 화면'], ['choose', '쓰레기 종류별 캐릭터 선택 화면']] }
]

function ContactButton() {
  return <a className="contact-button" href={contact}>깃허브 페이지 <ArrowUpRight aria-hidden size={17}/></a>
}

function HeroSection() {
  return <section className="hero relative flex flex-col">
    <FadeIn y={-20} className="relative z-20"><nav aria-label="주요 메뉴" className="flex justify-between px-6 md:px-10 pt-6 md:pt-8 text-sm md:text-lg lg:text-[1.4rem] font-medium uppercase tracking-wider">
      {[['About','#about'],['Skills','#skills'],['Projects','#projects'],['GitHub',contact]].map(([name,url]) => <a href={url} key={name}>{name}</a>)}
    </nav></FadeIn>
    <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5"><FadeIn delay={.15} y={40}><h1 className="hero-heading greeting">안녕하세요.</h1></FadeIn></div>
    <div className="portrait"><FadeIn delay={.6}><Magnet><img src={import.meta.env.BASE_URL + 'art/sanghyun-avatar.webp'} alt="검은 뿔테안경을 쓴 이상현의 캐리커처" fetchPriority="high"/></Magnet></FadeIn></div>
    <div className="relative z-20 mt-auto flex justify-between items-end gap-5 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
      <FadeIn delay={.35} y={20}><p className="hero-copy">배운 내용을 코드로 옮기고, 작은 아이디어를 웹과 게임으로 만듭니다.</p></FadeIn>
      <FadeIn delay={.5} y={20}><ContactButton/></FadeIn>
    </div>
  </section>
}

function AboutSection() {
  return <section id="about" className="about relative min-h-screen grid place-items-center px-5 sm:px-8 md:px-10 py-20">
    {['moon','object','lego','group'].map((c,i) => <div key={c} className={'decor '+c}><FadeIn x={i<2?-80:80} y={0} delay={[.1,.25,.15,.3][i]} duration={.9}><img src={art('fig',i+1)} alt="" loading="lazy"/></FadeIn></div>)}
    <div className="about-inner relative text-center"><FadeIn as="h2" y={40} className="hero-heading title">자기소개</FadeIn>
    <AnimatedText text="한국외국어대학교 글로벌 캠퍼스 컴퓨터공학부 2학년 이상현입니다. 웹프로그래밍과 알고리즘 등 전반적인걸 배우고있습니다."/>
    <ContactButton/></div>
  </section>
}

function SkillsSection() {
  return <section id="skills" className="services px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
    <h2 className="title text-center mb-16 sm:mb-20 md:mb-28">Tech Skills</h2>
    <div className="max-w-5xl mx-auto">{skills.map(([name,description],i) => <FadeIn key={name} as="article" delay={i*.1} className="service flex gap-6 md:gap-16 items-center py-8 sm:py-10 md:py-12">
      <span className="number">0{i+1}</span><div><h3>{name}</h3><p>{description}</p></div>
    </FadeIn>)}</div>
  </section>
}

function ProjectCard({index,progress}: {index:number;progress:MotionValue<number>}) {
  const project=works[index]
  const scale=useTransform(progress,[index/works.length,1],[1,1-(works.length-1-index)*.03])
  const reduced=useReducedMotion()
  return <div className="sticky-slot" style={{top:'calc(var(--pin) + '+index*28+'px)'}}>
    <motion.article className="work-card p-4 sm:p-6 md:p-8" style={{scale:reduced?1:scale}}>
      <div className="work-header"><span className="number">0{index+1}</span><div><p>{project.category}</p><h3>{project.name}</h3></div><a className="live-button" href={project.url}>프로젝트 보기 <ArrowUpRight aria-hidden size={16}/></a></div>
      {project.images.length > 0 && <div className="game-shots">{project.images.map(([file,alt]) => <img key={file} src={import.meta.env.BASE_URL+'art/game-'+file+'.png'} alt={alt} loading="lazy"/>)}</div>}
      <div className="work-description"><h4>소개 및 역할</h4><p>{project.description}</p></div>
    </motion.article>
  </div>
}

function ProjectsSection() {
  const track=useRef<HTMLDivElement>(null)
  const {scrollYProgress}=useScroll({target:track,offset:['start start','end end']})
  return <section id="projects" className="projects relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-16">
    <FadeIn as="h2" className="hero-heading title text-center mb-16">프로젝트</FadeIn>
    <div ref={track} className="project-stack">{works.map((p,i)=><ProjectCard key={p.name} index={i} progress={scrollYProgress}/> )}</div>
  </section>
}
function App(){return <main><HeroSection/><AboutSection/><SkillsSection/><ProjectsSection/></main>}
createRoot(document.getElementById('root')!).render(<App/>)
