// Declare a hypothetical User type
type User = {
  name: string
  age: number
}
// declare a data type for usecases of pattern match
type AsynData<T> =
  | {status: 'notAsked'}
  | {status: 'loading'}
  | {status: 'success', data: T}
  | {status: 'failure', error: Error}

// declare a matcher type
type Matcher<T, R> = {
  notAsked: () => R
  loading: () => R
  success: (data: T) => R
  failure: (error: Error) => R
}

// declare a matcher function
const match = <T, R>(m: Matcher<T, R>, ad: AsynData<T>): R => {
  if( ad.status === 'notAsked') {
    return m.notAsked()
  }
  if( ad.status === 'loading') {
    return m.loading()
  }
  if( ad.status === 'failure') {
    return m.failure(ad.error)
  }
    return m.success(ad.data)
}

// This is how it would be used
const LoadingUser = (props: AsynData<User>) => {
  match<User, React.ReactNode>(
    {
      notAsked: () => <Idle />,
      loading: () => <Loading />,
      failure: (error) => <ErrorMessage error={error} />,
      success: (data) => <UserCard user={user} />
    },
    props
  )
}