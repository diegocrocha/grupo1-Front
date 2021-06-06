import React from 'react'
import * as S from './style'
import api from "../../services/api";
import { UserContext } from '../../hooks/UserContext'
import BotaoMenuMetas from "../../components/BotaoMenuMetas/BotaoMenuMetas";
import BotaoAdicionar from "../../assets/botao-adicionar.svg";
import Aviao from "../../assets/aviao.svg";
import CardMetas from "../../components/CardMetas/CardMetas";
import GreyPig from "../../components/GreyPig/GreyPig";
import Head from '../../components/Helper/Head';
import Logo from '../../assets/logo-escuro.svg';
import * as G from '../../styles/globalComponents'
import ModalMetas from "../../components/ModalMetas/ModalMetas";

export default function Metas() {
    const { dados } = React.useContext(UserContext);
    const [metas, setMetas] = React.useState([]);
    const [metasAtivas, setMetasAtivas] = React.useState([]);
    const [metasInativas, setMetasInativas] = React.useState([]);
    const [metasFinalizadas, setMetasFinalizadas] = React.useState([]);
    const [ativo, setAtivo] = React.useState(0)
    const [modalMetasAtivo, setModalMetasAtivo] = React.useState(false)

    React.useEffect(() => {
        fetchMetas();
    }, [dados, metas]);

    async function fetchMetas() {
        if (dados) {
            const response = await api.get(`/economigos/usuarios/${dados.usuario.id}`);
            setMetas(response.data.metaDtos);

            let ativas = []
            let inativas = []
            let finalizadas = []

            metas.map(meta => meta.ativa ?
                meta.finalizada ? finalizadas.push(meta) : ativas.push(meta)
                :
                meta.finalizada ? finalizadas.push(meta) : inativas.push(meta)
            )

            setMetasAtivas(ativas)
            setMetasInativas(inativas)
            setMetasFinalizadas(finalizadas)
        }
    }

    return (
        <>
            {metas.length == 0 && !modalMetasAtivo && <ModalSemMetas />}
            {/* {modalMetasAtivo && <ModalMetas titulo={"Nova Meta"}/>} */}
            <S.Metas className={metas.length == 0 || modalMetasAtivo ? "animeRight blur" : "animeRight"}>
                <Head title="Metas" />
                <S.NavMetas>
                    <BotaoMenuMetas nome="Metas Ativas" setAtivo={setAtivo} active={ativo} idItemTab={0} />
                    <BotaoMenuMetas nome="Metas Inativas" setAtivo={setAtivo} active={ativo} idItemTab={1} />
                    <BotaoMenuMetas nome="Metas Finalizadas" setAtivo={setAtivo} active={ativo} idItemTab={2} />
                </S.NavMetas>
                <S.AdicionarMeta>
                    <img src={BotaoAdicionar} alt="" />
                </S.AdicionarMeta>
                {
                    ativo == 0 ?
                        (metasAtivas.length == 0 ?
                            <GreyPig height="50" mensagem="Esta conta não possui metas Ativas!" />
                            :
                            <S.Cards style={metas.length > 4 ? { overflowY: "scroll" } : { overflowY: "hidden" }}>
                                {
                                    metasAtivas.map(itemMeta => (
                                        <CardMetas key={itemMeta.id} nome={itemMeta.nome} urlImage={Aviao} valorFinal={itemMeta.valorFinal} valorInicial={itemMeta.valorAtual} />
                                    ))
                                }
                            </S.Cards>
                        )
                        :
                        (ativo == 2 ?
                            metasFinalizadas.length == 0 ?
                                (
                                    <GreyPig height="50" mensagem="Esta conta não possui metas finalizadas!" />
                                )
                                :
                                (
                                    <S.Cards style={metas.length > 4 ? { overflowY: "scroll" } : { overflowY: "hidden" }}>
                                        {
                                            metasFinalizadas.map(itemMeta => (
                                                <CardMetas key={itemMeta.id} nome={itemMeta.nome} urlImage={Aviao} valorFinal={itemMeta.valorFinal} valorInicial={itemMeta.valorAtual} />
                                            ))
                                        }
                                    </S.Cards>
                                )
                            :
                            metasInativas.length == 0 ?
                                (
                                    <GreyPig height="50" mensagem="Esta conta não possui metas inativas!" />
                                )
                                :
                                (
                                    <S.Cards style={metas.length > 4 ? { overflowY: "scroll" } : { overflowY: "hidden" }}>
                                        {
                                            metasInativas.map(itemMeta => (
                                                <CardMetas key={itemMeta.id} nome={itemMeta.nome} urlImage={Aviao} valorFinal={itemMeta.valorFinal} valorInicial={itemMeta.valorAtual} />
                                            ))
                                        }
                                    </S.Cards>
                                )
                        )
                }
            </S.Metas>
        </>
    )
}

function ModalSemMetas() {

    return (
        <G.SemWrapper>
            <G.ModalSem>
                <img src={Logo} />
                <p>Você não possui metas</p>
                <p>Adicione uma meta agora mesmo!</p>
                <G.Button color="#32A287">Adicionar meta</G.Button>
            </G.ModalSem>
        </G.SemWrapper>
    )

}