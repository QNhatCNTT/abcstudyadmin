/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { Divider, Drawer, List } from '@material-ui/core'
import listMenuAdmin from './ListMenuAdminItem'
import listMenuTeacher from './ListMenuTeacherItem'
import useStyles from './styles'
import MenuItem from './MenuItem'
import { Card } from 'antd'

import Logo from '../../logo.svg'

const { Meta } = Card
function Sidebar () {
  const classes = useStyles()
  const [role, setRole] = useState('admin')
  const [image, setImage] = useState(null)
  const [profile, setProfile] = useState('')

  useEffect(() => {
    const profileExist = JSON.parse(localStorage.getItem('profile'))
    if (profileExist) {
      setRole(profileExist.role)
      setImage(profileExist.avatarLink !== null ? profileExist.avatarLink : Logo)
      setProfile(profileExist)
    }
  }, [])

  return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <Card
          hoverable
          cover={<img src={image} style={{ height: 100 }} alt="ABClogo"/>}
        >
          <Meta title={`${profile.firstName} ${profile.lastName}`} description={profile.email} />
        </Card>
        <Divider/>
        <List className={classes.listItem}>
          { (role === 'admin' ? listMenuAdmin : listMenuTeacher).map(item => (
            <NavLink to={item.path} exact={item.excat} className={classes.menuLink} key={item.path}>
                <MenuItem name={item.name} divider/>
            </NavLink>
          ))}
        </List>
      </Drawer>
  )
}

export default withRouter(Sidebar)
