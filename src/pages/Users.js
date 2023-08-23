import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from 'redux/_actions/users'
import Card from 'components/MasterCard'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const loading = useSelector((state) => state.users.loading)
  const error = useSelector((state) => state.users.error)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <Fragment>
      {users.loading && <p>Loading...</p>}
      {users.length === 0 && !loading && <p>No users available!</p>}
      {error && !loading && <p>{error}</p>}
      {users.length > 0 &&
        users.map((user) => <Card key={user.id} user={user} />)}
    </Fragment>
  )
}

export default Users
