import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://www.osiztechnologies.com" target="_blank" rel="noopener noreferrer">
          OsizTechnologies
        </a>
        <span className="ms-1">&copy; 2023 &copy;.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.osiztechnologies.com/" target="_blank" rel="noopener noreferrer">
          Osiz Breeding WebSite &copy; 2023
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
