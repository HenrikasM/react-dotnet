import { reaction } from "mobx"

import react from 'react';
import { Link } from "react-router-dom";
import { Icon, Segment, Header, Button } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'/>
            Not found..
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/activities' primary>
                    Return to main page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}