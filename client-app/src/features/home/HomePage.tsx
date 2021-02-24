import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Segment, Image } from 'semantic-ui-react'

export default function HomePage(){
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' style={{marginBottom: 12}} />
                    Reactivities
                </Header>
                <Header as='h2' inverted contex='Welcome to reactivities' />
                <Button as={Link} to='/activities' size='huge' inverted>
                    Take me to the activities!
                </Button>
            </Container>
        </Segment>
    )
}
