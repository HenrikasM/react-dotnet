import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from "uuid";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/form/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer( function ActivityForm() {

    const {activityStore} = useStore();
    const history = useHistory();
        const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
        const {id} = useParams<{id: string}>();

        const [activity, setActivity] = useState<Activity>({
            id: '',
            title: '',
            category: '',
            description: '',
            date: null,
            city: '',
            venue: ''
        });

        const validationSchema = Yup.object({
            title: Yup.string().required('The activity title is required'),
            description: Yup.string().required('The activity description is required'),
            category: Yup.string().required(),
            date: Yup.string().required('Date is required').nullable(),
            venue: Yup.string().required(),
            city: Yup.string().required(),

        })

        useEffect(() => {
            if (id) loadActivity(id).then(activity => setActivity(activity!))
        }, [id, loadActivity])

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0){
            let newActivity = {
                ...activity,
                id: uuid()

            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }

    }

    if(loadingInitial) return <LoadingComponent content='Loading activity..'/> 

    return(
        <Segment clearing>
            <Header context='Activity Details' sub color='teal'/>
        <Formik enableReinitialize validationSchema={validationSchema} initialValues={activity} 
        onSubmit={values =>handleFormSubmit(values)}>
            {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                <MyTextInput placeholder='Title' name='title' />
                <MyTextArea rows={3} placeholder='Description'  name='description'  />
                <MySelectInput options={categoryOptions} placeholder='Category'  name='category'  />
                <MyDateInput placeholderText='Date' name='date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:m aa'/>
                <Header context='Location Details' sub color='teal'/>
                <MyTextInput placeholder='City' name='city' />
                <MyTextInput placeholder='Venue' name='venue'/>
                <Button loading = {loading} floated='right' positive type='submit' content='Submit' disabled={isSubmitting || !dirty || !isValid}/>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
            )}
        </Formik>
        </Segment>
    )
})