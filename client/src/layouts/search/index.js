import { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import Typography from '@mui/material/Typography';
import TableSearch from "./layouts/components/tableSearch/index.js";
import SummarySearch from "./layouts/components/summarySearch/index.js";
import { useLocation } from "react-router-dom";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard/index.js";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmployeeTableSearch from "./layouts/components/employeeTableSearch/index.js";
import Saly from './assets/Saly-10.png';
require('dotenv').config();
import axios from 'axios';

export default function Search(){
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const selectedSearch = param.get('type');
    const search = selectedSearch;
    const BASE_URL = process.env.BASE_URL || ""

    const [data, setData] = useState([]);
    const [errors, setErrors] = useState({
        uid: false,
        name: false,
        fetchError: false,
        fetchErrorMsg: "",
    })
    const [values, setValues] = useState({
        uid: "",
        organization: "",
        work_location: "",
        employee_certifications: [],
        count: "",
    });

    useEffect(() => {
        const handleSearchSubmit = async () => {
            
            const query = encodeURIComponent(selectedSearch);
            axios.get(`${BASE_URL}/api/employee/search?type=${query}`)
            .then((response) => {
                setData(response.data);
            }).catch(error => {
                setErrors({
                    ...errors,
                    fetchError: true,
                    fetchErrorMsg: error.msg,
                })
            })
        }
        handleSearchSubmit();

    }, [selectedSearch]);

    const getSummary = (event) =>
        event.map((element) => {
        return <SummarySearch department={element.organization} location={element.work_location} count={element.employee_certifications.length}/>   
    });
    
    const getTable= (event) =>
    event.map((element) => {
        return <TableSearch data={element.employee_certifications}/>
    })

    const searchType = /[A-Za-z0-9]{9,10}IBM/.test(search);

    return (
        <DashboardLayout>
            {search ? <>
                {search === "undefined" || data.length === 0? <>
                    <Grid container spacing={3} justifyContent="flex-start">
                        <Grid item xs>
                                <Typography component="h1" variant="h8">                            
                                No existen resultados para esa búsqueda
                                </Typography>
                        </Grid>
                    </Grid>
                </> : <>
                    <Grid container spacing={3} justifyContent="flex-start">
                        <Grid item xs>
                            <Typography component="h1" variant="h8">                            
                                Resultados de Búsqueda: {search}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justifyContent="space-around" alignItems="flex-start" direction="column">
                        <Grid item xs>
                            <Typography component="h2" variant="h6">
                                Resumen
                            </Typography>
                        </Grid>
                        <Grid item>
                            { searchType ? <>
                                {getSummary(data)}
                                </> : <>
                                <ComplexStatisticsCard
                                    icon={<PersonOutlineOutlinedIcon/>}
                                    title="Empleados Certificados"
                                    percentage={{
                                        color: "success",
                                            amount: "55%",
                                            label: "de los empleados totales",
                                        }}
                                    count={data.length}/>
                                </>
                            }
                        </Grid>
                        <Grid item xs>
                            <Typography component="h2" variant="h6">
                                Lista
                            </Typography>
                        </Grid>
                        <Grid item>
                            {searchType ?
                                <> {getTable(data)} </> :
                                <EmployeeTableSearch data={data}/>
                            }
                        </Grid>
                    </Grid>
                    </>}
                </> : <>
                    <Grid container spacing={3} justifyContent="flex-start" alignItems="center" direction="column">
                        <Grid item xs >
                            <MDBox component="img" src={Saly} alt="Search Icon"/>
                        </Grid>
                    <Grid item xs >
                        <Typography component="h1" variant="h8">
                            ¡Inicia tu Búsqueda!
                        </Typography>
                    </Grid>
                    </Grid>
                </>}
        </DashboardLayout>
    );
}