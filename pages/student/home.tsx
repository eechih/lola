import {
  GRAPHQL_AUTH_MODE,
  GraphQLQuery,
  GraphQLResult,
} from '@aws-amplify/api'
import { CONNECTION_STATE_CHANGE, ConnectionState } from '@aws-amplify/pubsub'
import {
  Button,
  Divider,
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Alert as UIAlert,
  View,
  WithAuthenticatorProps,
  withAuthenticator,
} from '@aws-amplify/ui-react'
import { API, Hub } from 'aws-amplify'
import { useEffect, useState } from 'react'

import {
  CreateStudentInput,
  CreateStudentMutation,
  DeleteStudentMutation,
  ListStudentsQuery,
  ListStudentsQueryVariables,
  Student,
} from '../../src/API'
import * as mutations from '../../src/graphql/mutations'
import * as queries from '../../src/graphql/queries'

const initialState = { name: '', dateOfBirth: '', email: '', examsCompleted: 0 }

type Alert = {
  id: string
  variation: 'error' | 'warning'
  heading?: string
  body: string
}

type SearchCriteria = {
  name: string
}

const initialSearchCriteria: SearchCriteria = { name: '' }

const Home = ({ signOut, user }: WithAuthenticatorProps) => {
  const [formState, setFormState] = useState(initialState)
  const [students, setStudents] = useState<Student[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isMutating, setMutating] = useState<boolean>(false)
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(
    initialSearchCriteria
  )

  Hub.listen('api', (data: any) => {
    const { payload } = data
    if (payload.event === CONNECTION_STATE_CHANGE) {
      const connectionState = payload.data.connectionState as ConnectionState
      console.log('connectionState', connectionState)
    }
  })

  useEffect(() => {
    fetchStudents(initialSearchCriteria)
  }, [])

  function setInput(key: string, value: string) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchStudents(criteria: SearchCriteria) {
    try {
      const variables: ListStudentsQueryVariables = {
        filter: { name: { contains: criteria.name } },
      }
      const res = await API.graphql<GraphQLQuery<ListStudentsQuery>>({
        query: queries.listStudents,
        variables: variables,
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      console.log(res)
      if (res.data?.listStudents) {
        const { items, nextToken } = res.data.listStudents
        console.log('Students retrieved successfully!', items)
        if (items) setStudents(items as Student[])
      }
    } catch (error) {
      console.log('Error retrieving Students', error)
    }
  }

  async function createStudent() {
    const prevStudents = students
    try {
      if (!formState.name) return
      setMutating(true)
      const studentDeatils: CreateStudentInput = { ...formState }
      setStudents([...students, studentDeatils as Student])
      setFormState(initialState)
      await API.graphql<GraphQLQuery<CreateStudentMutation>>({
        query: mutations.createStudent,
        variables: { input: studentDeatils },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      setMutating(false)
    } catch (error) {
      console.log('Error creating Students', error)
      setStudents(prevStudents)
      setMutating(false)
      const res = error as GraphQLResult
      const newAlerts: Alert[] =
        res.errors?.map(error => {
          return {
            id: '' + Date.now(),
            variation: 'error',
            body: error.message,
          }
        }) ?? []
      setAlerts([...newAlerts, ...alerts])
    }
  }

  async function deleteStudent(studentId: string) {
    const prevStudents = students
    try {
      setMutating(true)
      setStudents(students.filter(student => student.id !== studentId))
      await API.graphql<GraphQLQuery<DeleteStudentMutation>>({
        query: mutations.deleteStudent,
        variables: { input: { id: studentId } },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      })
      setMutating(false)
    } catch (error) {
      console.log('Error deleting Student', error)
      setStudents(prevStudents)
      setMutating(false)
      const res = error as GraphQLResult
      const newAlerts: Alert[] =
        res.errors?.map(error => {
          return {
            id: '' + Date.now(),
            variation: 'error',
            body: error.message,
          }
        }) ?? []
      setAlerts([...newAlerts, ...alerts])
    }
  }

  function dismissAlert(alertId: string) {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  return (
    <View margin="1rem">
      <Flex direction="column">
        {alerts.map(alert => (
          <UIAlert
            key={alert.id}
            isDismissible={true}
            variation={alert.variation}
            heading={alert.heading}
            onDismiss={() => dismissAlert(alert.id)}
          >
            {alert.body}
          </UIAlert>
        ))}
        <Flex justifyContent="space-between" alignItems="center">
          <Heading level={3}>學生管理</Heading>
          <Flex alignItems="center">
            <Heading level={6}>{user?.username}</Heading>
            <Button variation="link" size="small" onClick={signOut}>
              登出
            </Button>
          </Flex>
        </Flex>

        <Flex direction="column" maxWidth="32rem" width="100%">
          <TextField
            placeholder="姓名"
            label="姓名"
            errorMessage="There is an error"
            onChange={event => setInput('name', event.target.value)}
            value={formState.name}
          />
          <TextField
            placeholder="格式 1999-01-01"
            label="生日"
            errorMessage="There is an error"
            onChange={event => setInput('dateOfBirth', event.target.value)}
            value={formState.dateOfBirth}
          />
          <TextField
            placeholder="格式 john@example.com"
            label="Email"
            errorMessage="There is an error"
            onChange={event => setInput('email', event.target.value)}
            value={formState.email}
          />
          <TextField
            placeholder="考試成績"
            label="考試成績"
            errorMessage="There is an error"
            onChange={event => setInput('examsCompleted', event.target.value)}
            value={formState.examsCompleted}
          />
          <Button
            isDisabled={isMutating}
            onClick={createStudent}
            variation="primary"
          >
            建檔
          </Button>
        </Flex>
        <Divider orientation="horizontal" />

        <Flex direction="row" maxWidth="32rem" width="100%">
          <TextField
            placeholder="姓名"
            label="姓名"
            labelHidden={true}
            errorMessage="There is an error"
            onChange={event =>
              setSearchCriteria({ ...searchCriteria, name: event.target.value })
            }
            value={searchCriteria.name}
          />
          <Button
            onClick={() => fetchStudents(searchCriteria)}
            variation="primary"
          >
            搜尋
          </Button>
        </Flex>
        <Table caption="" highlightOnHover={true}>
          <TableHead>
            <TableRow>
              <TableCell as="th">名稱</TableCell>
              <TableCell as="th">價格</TableCell>
              <TableCell as="th">成本</TableCell>
              <TableCell as="th">描述</TableCell>
              <TableCell as="th">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, index) => (
              <TableRow key={student.id ?? index}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.dateOfBirth}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.examsCompleted}</TableCell>
                <TableCell>
                  <Button
                    variation="link"
                    isDisabled={isMutating}
                    onClick={() => deleteStudent(student.id)}
                  >
                    刪除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Flex>
    </View>
  )
}

export default withAuthenticator(Home)
