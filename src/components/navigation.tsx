import { graphql, navigate } from 'gatsby'
import { StaticQuery } from 'gatsby'
import { Box, Keyboard, Text } from 'grommet'
import React, { KeyboardEventHandler, useContext, useEffect } from 'react'
import { NavigationQuery } from '../generated/graphql'
import { css, ThemeProps } from '../styles'
import { Idx } from '../utils'
import { FilterTagsContext } from './filter-tags'
import { PageType } from './layout'
import { Link } from './link'

export const navigationStyles = ({ theme }: ThemeProps) => css`
  padding: ${theme.global.edgeSize.medium};
  height: 100%;

  justify-content: space-between;

  .links,
  .tags {
    margin: ${theme.global.edgeSize.small} 0;

    & > * {
      margin: ${theme.global.edgeSize.hair} 0;
    }
  }

  aside {
    align-self: end;
  }
`

export const TagLinks: React.FC = () => {
  const { allTags, setTagsFilter, tagsFilter } = useContext(FilterTagsContext)

  const handleTagClick = (tag: string) => () => {
    if (tagsFilter.includes(tag)) {
      setTagsFilter(tagsFilter.filter(el => el !== tag))
    } else {
      setTagsFilter([...tagsFilter, tag])
    }
  }

  return (
    <>
      {allTags.map(tag => (
        <Link
          key={tag}
          color={tagsFilter.includes(tag) ? 'brand' : 'black'}
          onClick={handleTagClick(tag)}
          size="xxlarge"
        >
          {tag}
        </Link>
      ))}
    </>
  )
}

export interface NavigationProps {
  pageType: PageType
}

export const Navigation: React.FC<NavigationProps> = ({ pageType }) => {
  const { allTags, setTagsFilter, tagsFilter } = useContext(FilterTagsContext)

  const handleEsc = () => {
    if (pageType !== PageType.Home) {
      navigate('/')
    } else {
      setTagsFilter([])
    }
  }

  return (
    <Keyboard target="document" onEsc={handleEsc}>
      <Box css={navigationStyles} className="navigation">
        <div>
          <code>Logo</code>
          <Box as="nav" className="links">
            <Link color="text" size="large" to="/">
              home
            </Link>
            <Link color="text" size="large" to="/about">
              about
            </Link>
          </Box>
          {pageType === PageType.Home && (
            <Box className="tags">
              <TagLinks />
            </Box>
          )}
        </div>
        <StaticQuery<Idx<NavigationQuery>> query={navigationQuery}>
          {data => (
            <aside>
              <Text size="xsmall">{data.datoCmsHomePage.introText}</Text>
            </aside>
          )}
        </StaticQuery>
      </Box>
    </Keyboard>
  )
}

export const navigationQuery = graphql`
  query NavigationQuery {
    datoCmsHomePage {
      introText
    }
  }
`