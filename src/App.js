import { useState } from 'react'
import {
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  
} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'


function App() {

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const [modalInfo, setModalInfo] = useState('')
  const [data, setData] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const handleButton = () => {
    let exists = data.find(item => item.email === email)
    if (exists === undefined && email && name && email.includes('@')) {
      setData([...data, { name, email }])
      console.log(data)
      setName('');
      setEmail('');
    }

    if (!email.includes('@')) {
      setModalInfo('Enter a Valid Email')
      setIsOpen(true)
    }

    if (exists) {
      setModalInfo('Email Already Exists!')
      setIsOpen(true)
    }

    if (!email) {
      setModalInfo('Enter Email!')
      setIsOpen(true)
    }

    if (!name) {
      setModalInfo('Enter Name!');
      setIsOpen(true)
    }

  }

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData)
  }

  return (
    <div className="App">
      <div className="input-field">
        <Input placeholder="Name" value={name} borderColor="gray.100" onChange={(e) => { setName(e.target.value) }} />
        <Input type="email" placeholder="Email" borderColor="gray.100" value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <Button colorScheme="gray" onClick={handleButton}>Add</Button>
      </div>

      <div className="table">
        <Table variant="simple">
          
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>

            {
              data.map((info, index) => (
                <Tr key={index}>
                  <Td>{info.name}</Td>
                  <Td>{info.email}</Td>
                  <Td><Button colorScheme="blue" onClick={() => handleDelete(index)}>Delete <DeleteIcon /> </Button></Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>warnng!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalInfo}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={2} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
