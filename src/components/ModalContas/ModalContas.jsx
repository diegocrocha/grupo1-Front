import React from 'react'
import * as S from "./style";
import * as G from "../../styles/globalComponents";
import Input from '../Form/Input/Input'
import api from '../../services/api';
import useForm from '../../hooks/useForm'
import { UserContext } from '../../hooks/UserContext';
import { toast } from 'react-toastify';
import "../../styles/style-toasty.css";

export default function ModalContas({ titulo, setModal }) {

    const { dados, reload } = React.useContext(UserContext);
    const apelido = useForm()
    const descricao = useForm()
    const banco = useForm()
    const [ativa, setAtiva] = React.useState(true);

    function handleOutsideClick(event) {
        if (event.target === event.currentTarget) {
            setModal(false);
        }
    }

    async function handleSubmit() {
        if (dados) {
            const responseG = await api.post(`/economigos/contas`, {
                banco: banco.value,
                numeroConta : 0,
                descricao: descricao.value,
                apelido: apelido.value,
                idUsuario: dados.usuario.id,
            })
            if (await responseG.status === 201) {
                toast.success("Conta cadastrada com sucesso")
            } else {
                toast.error("Erro ao cadastrar a Conta")
            }
        }
        reload()
    }

    function continuarCadastrando() {
        handleSubmit()
        banco.value = ""
        apelido.value = ""
        descricao.value = ""
    }

    function cadastar() {
        handleSubmit()
        setModal(false)
    }

    return (
        <G.WrapperModal onClick={handleOutsideClick}>
            <G.Modal type={"RECEITA"} largura={30} altura={45} marginLeft={35} marginTop={15}>
                <G.ButtonClose onClick={() => setModal(false)}>X</G.ButtonClose>
                <h1>{titulo}</h1>
                <form className="wrapperInputs">
                    <div className="groupInputs">
                        <span className="divInput">
                            <Input
                                className="inputWidth"
                                label="banco"
                                {...banco} />
                        </span>
                        <span className="divInput">
                            <Input
                                label="Apelido"
                                id="apelido"
                                {...apelido} />
                        </span>
                    </div>
                    <div className="groupInputs">
                        <span className="divInput">
                            <Input
                                label="Descrição"
                                id="descricao"
                                {...descricao} />
                        </span>
                        <span className="divInput">
                        </span>
                    </div>
                </form>
                <G.GroupButtonsModal style={{ marginLeft: "2%" }}>
                    <G.Button onClick={cadastar} style={{ padding: "0" }} color="#32A287">Adicionar</G.Button>
                    <G.SimpleButton onClick={continuarCadastrando} color="#32A287">Adicionar e continuar cadastrando</G.SimpleButton>
                </G.GroupButtonsModal>
            </G.Modal>
        </G.WrapperModal>
    )
}
