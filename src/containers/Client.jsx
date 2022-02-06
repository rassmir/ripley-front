import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteAll, getAll, postAll, updateAll} from "../actions/generalActions";
import {
    ADD_CLIENT,
    DELETE_CLIENT,
    ERROR_CLIENT,
    GET_ALL_CLIENTS,
    LOAD_CLIENT,
    UPDATE_CLIENT
} from "../types/clientsTypes";
import {useForm} from "react-hook-form";
import Datatable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {CgUserAdd} from "react-icons/cg";
import {BiPencil} from "react-icons/bi";
import {FiTrash} from "react-icons/fi";
import Modal from "../components/Modal";

const Client = () => {
    const dispatch = useDispatch();
    const [modalCreateClient, setModalCreateClient] = useState(false);
    const [modalEditClient, setModalEditClient] = useState(false);
    const [modalDeleteClient, setModalDeleteClient] = useState(false);
    const [client, setClient] = useState({
        name: ''
    })
    const {clients} = useSelector(state => state.clientsReducers);
    useEffect(() => {
        dispatch(getAll('clients', LOAD_CLIENT, GET_ALL_CLIENTS, ERROR_CLIENT))
    }, [])

    const {register, formState: {errors}, handleSubmit, reset, setValue} = useForm();
    const openCloseCreateClient = () => {
        setModalCreateClient(!modalCreateClient)
        reset({
            name: '',
            lastname: '',
            date: ''
        })
    }

    const openCloseEditClient = () => {
        setModalEditClient(!modalEditClient)
    }

    const openCloseDeleteClient = () => {
        setModalDeleteClient(!modalDeleteClient)
    }

    const openModalByType = (row, type) => {
        setValue('id', row.id)
        setValue('name', row.name)
        setValue('lastname', row.lastname)
        setValue('date', row.date)
        setClient({
            name: row.name
        })

        if (type === "edit") {
            openCloseEditClient()
        }
        if (type === "delete") {
            openCloseDeleteClient()
        }
    }

    const FormCreateCategory = (data) => {
        const {name, lastname, genre,date} = data;
        const params = new URLSearchParams();
        params.append('_method', 'POST');
        params.append('name', name);
        params.append('lastname', lastname);
        params.append('genre', genre);
        params.append('date', date);
        dispatch(postAll('clients', params, ADD_CLIENT, ERROR_CLIENT, true, '', ''))

        setModalCreateClient(false)
    }

    const FormEditClient = (data) => {
        const {name, lastname, date, id} = data;
        const params = new URLSearchParams();
        params.append('_method', 'PUT');
        params.append('name', name);
        params.append('lastname', lastname);
        params.append('date', date);
        dispatch(updateAll('clients', id, params, UPDATE_CLIENT, ERROR_CLIENT, 'Actualizado Correctamente', ''))

        setModalEditClient(false);
    }
    const FormDeleteClient = (data) => {
        const {id} = data;
        dispatch(deleteAll('clients', id, DELETE_CLIENT, ERROR_CLIENT, 'Eliminado Correctamente', ''))
        setModalDeleteClient(false);
    }

    const DatatableClient = () => {
        const customStyles = {
            rows: {
                style: {
                    minHeight: '60px',
                    fontSize: '15px',
                    fontWeight: '500'
                }
            },
            headCells: {
                style: {
                    paddingLeft: '58px',
                    backgroundColor: 'rgb(107 33 168)',
                    color: '#fff',
                    fontSize: '16px',
                },
            },
            cells: {
                style: {
                    paddingLeft: '54px',
                },
            },
        };
        const columns = [
            {
                name: '#',
                cell: (row, index) => index + 1
            },
            {
                name: 'NOMBRE',
                selector: row => row.name
            },
            {
                name: 'APELLIDO',
                selector: row => row.lastname
            },
            {
                name: 'GÉNERO',
                selector: row => row.genre
            },
            {
                name: 'FECHA NACIMIENTO',
                selector: row => row.date
            },
            {
                name: 'ACCIONES',
                selector: row => {
                    return (
                        <Fragment>
                            <button className="bg-yellow-400 px-4 py-2 rounded-md hover:opacity-90 mr-3"
                                    onClick={() => openModalByType(row, 'edit')}
                            >
                                <BiPencil className="w-5 h-5"/>
                            </button>
                            <button className="bg-red-500 px-4 py-2 rounded-md hover:opacity-90 text-white"
                                    onClick={() => openModalByType(row, "delete")}
                            >
                                <FiTrash className="w-5 h-5"/>
                            </button>

                        </Fragment>
                    );
                }
            }
        ]

        return (
            <Fragment>
                <Modal height="max-w-2xl" onOpen={modalCreateClient} onClose={setModalCreateClient}>
                    <form onSubmit={handleSubmit(FormCreateCategory)} className="p-8">
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="name">
                                    Nombre Completo
                                </label>
                                <input
                                    id="name"
                                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.name ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-1 focus:ring-primary"
                                    }`}
                                    {...register("name", {required: true})}
                                    name="name" type="text"
                                />
                                {errors.name?.type === 'required' &&
                                    <p className="text-xs text-red-500 mt-1 absolute">Este campo es requerido</p>}
                            </div>
                            <div>
                                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="name">
                                    Apellido Completo
                                </label>
                                <input
                                    id="name"
                                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.lastname ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-1 focus:ring-primary"
                                    }`}
                                    {...register("lastname", {required: true})}
                                    name="lastname" type="text"
                                />
                                {errors.lastname?.type === 'required' &&
                                    <p className="text-xs text-red-500 mt-1 absolute">Este campo es requerido</p>}
                            </div>
                            <div>
                                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="name">
                                    Genero
                                </label>
                                <select {...register("genre", {required: true})} className="shadow border rounded w-full py-3 px-3 text-gray-700">
                                    <option value="male">Hombre</option>
                                    <option value="female">Mujer</option>
                                </select>
                                {errors.genre?.type === 'required' &&
                                    <p className="text-xs text-red-500 mt-1 absolute">Este campo es requerido</p>}
                            </div>
                            <div>
                                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="name">
                                    Fecha De Nacimiento
                                </label>
                                <input
                                    id="name"
                                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.date ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-1 focus:ring-primary"
                                    }`}
                                    {...register("date", {required: true})}
                                    name="date" type="date"
                                />
                                {errors.date?.type === 'required' &&
                                    <p className="text-xs text-red-500 mt-1 absolute">Este campo es requerido</p>}
                            </div>
                            <div className="mt-2">
                                <button
                                    className="w-full bg-purple-800 hover:bg-opacity-90 text-white font-extrabold py-3 px-4 rounded">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>

                <Modal height="max-w-2xl" onOpen={modalEditClient} onClose={setModalEditClient}>
                    <form onSubmit={handleSubmit(FormEditClient)} className="p-8">
                        <div className="grid grid-cols-1 gap-y-6">
                            <div>
                                <label className="block text-primary text-sm font-bold mb-2" htmlFor="name">
                                    Nombre Completo
                                </label>
                                <input
                                    id="name"
                                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.name ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-1 focus:ring-primary"
                                    }`}
                                    {...register("name", {required: true})}
                                    name="name" type="text"
                                />
                                {errors.name?.type === 'required' &&
                                    <p className="text-xs text-red-500 mt-1 absolute">Este campo es requerido</p>}
                            </div>
                            <div>
                                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="name">
                                    Apellido Completo
                                </label>
                                <input
                                    id="name"
                                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.lastname ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-1 focus:ring-primary"
                                    }`}
                                    {...register("lastname", {required: true})}
                                    name="lastname" type="text"
                                />
                                {errors.lastname?.type === 'required' &&
                                    <p className="text-xs text-red-500 mt-1 absolute">Este campo es requerido</p>}
                            </div>
                            <div>
                                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="name">
                                    Genero
                                </label>
                                <select {...register("genre", {required: true})} className="shadow border rounded w-full py-3 px-3 text-gray-700">
                                    <option value="male">Hombre</option>
                                    <option value="female">Mujer</option>
                                </select>
                                {errors.genre?.type === 'required' &&
                                    <p className="text-xs text-red-500 mt-1 absolute">Este campo es requerido</p>}
                            </div>
                            <div>
                                <label className="block text-purple-800 text-sm font-bold mb-2" htmlFor="name">
                                    Fecha De Nacimiento
                                </label>
                                <input
                                    id="name"
                                    className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                        errors.date ? "border-red-500 ring-1 ring-red-500" : "focus:border-primary focus:ring-1 focus:ring-primary"
                                    }`}
                                    {...register("date", {required: true})}
                                    name="date" type="date"
                                />
                                {errors.date?.type === 'required' &&
                                    <p className="text-xs text-red-500 mt-1 absolute">Este campo es requerido</p>}
                            </div>
                            <div className="mt-2">
                                <button
                                    className="w-full bg-purple-800 hover:bg-opacity-90 text-white font-extrabold py-3 px-4 rounded">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>

                <Modal height="max-w-2xl" onOpen={modalDeleteClient} onClose={setModalDeleteClient}>
                    <form onSubmit={handleSubmit(FormDeleteClient)} className="p-8">
                        <div className="grid grid-cols-1 gap-y-6">
                            <h2 className="text-[20px] text-center font-semibold">Estás seguro que deseas
                                eliminar al cliente: <br/>
                                <span className="text-purple-800">"{client.name}"</span> ?</h2>
                            <div>
                                <button
                                    className="w-full bg-red-600 hover:bg-red-500 text-white font-Poppins-Bd py-3 px-4 rounded">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>

                <DataTableExtensions
                    columns={columns}
                    data={clients}
                    print={false}
                    export={false}
                    filterPlaceholder="Buscar Cliente"
                >
                    <Datatable
                        columns={columns}
                        data={clients}
                        fixedHeader={true}
                        responsive={true}
                        customStyles={customStyles}
                        pagination={true}
                    />
                </DataTableExtensions>
            </Fragment>
        )
    }
    return (

        <Fragment>
            <div className="w-full bg-white rounded-xl px-10 py-8 drop-shadow-xl">
                <div className="md:flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-[24px] text-purple-800">Lista de clientes</h3>
                    </div>
                    <div>
                        <button
                            onClick={() => openCloseCreateClient()}
                            className="flex items-center gap-2 text-white bg-purple-800 px-6 py-2.5 rounded-lg hover:opacity-80">
                            <CgUserAdd className="w-5 h-5"/>
                            Crear Cliente
                        </button>
                    </div>
                </div>
                {DatatableClient()}
            </div>
        </Fragment>
    )
}
export default Client;