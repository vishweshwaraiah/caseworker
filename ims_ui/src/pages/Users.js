import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from 'redux/_actions/users'
import JvTable from 'components/JvTable'
import UtHeaders from 'constants/UtHeaders'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.userList)
  const loading = useSelector((state) => state.users.loading)
  const error = useSelector((state) => state.users.error)

  const [fetch, setFetch] = useState(false)
  const [defText, setDefText] = useState('Signin to see users!')

  const fetchUsers = () => {
    dispatch(getUsers())
    setFetch(true)
  }

  useEffect(() => {
    if (fetch && users.length === 0) {
      setDefText('No users available!')
    }
  }, [fetch])

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Fragment>
      {users.loading && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}
      {users.length === 0 && !error && !loading && <p>{defText}</p>}
      {users.length > 0 && !error && (
        <JvTable headerRows={UtHeaders} dataRows={users} />
      )}
    </Fragment>
  )
}

export default Users
