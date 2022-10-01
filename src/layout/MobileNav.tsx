import React, { useContext } from 'react'
import { SectionContext } from '../components/context/SectionInViewContext'
import BottomNav from '../components/mobile/BottomNav'
import BottomNavAction from '../components/mobile/BottomNavAction'
import { CirclePersonIcon, ResumeIcon, WorkerIcon } from '../icons'

export enum NavigationSections{
    AboutMe = "AboutMe",
    Projects = "Projects",
    Contact = "Contact"
}

const MobileNav = () => {
    const activeId = useContext(SectionContext)?.activeSection?.current?.id

  return (
    <BottomNav>
    <BottomNavAction
      icon={<CirclePersonIcon />}
      label="About Me"
      isActive={activeId == NavigationSections.AboutMe}
    />
    <BottomNavAction
      icon={<WorkerIcon />}
      label="Projects"
      isActive={activeId == NavigationSections.Projects}
    />
    <BottomNavAction
      icon={<ResumeIcon />}
      label="Contact"
      isActive={activeId == NavigationSections.Contact}
    />
  </BottomNav>
  )
}

export default MobileNav