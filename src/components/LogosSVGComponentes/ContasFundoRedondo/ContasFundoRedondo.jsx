import React from 'react';
import * as S from './style';

function ContasFundoRedondo({active}) {
    return (
        <S.ContasFundoRedondo active={active} width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17.5" cy="17.5" r="17.5" />
            <path d="M26.0156 13H11.125C10.7797 13 10.5 12.7203 10.5 12.375C10.5 12.0297 10.7797 11.75 11.125 11.75H26.125C26.4703 11.75 26.75 11.4703 26.75 11.125C26.75 10.0895 25.9105 9.25 24.875 9.25H10.5C9.11914 9.25 8 10.3691 8 11.75V24.25C8 25.6309 9.11914 26.75 10.5 26.75H26.0156C27.1102 26.75 28 25.909 28 24.875V14.875C28 13.841 27.1102 13 26.0156 13ZM24.25 21.125C23.5598 21.125 23 20.5652 23 19.875C23 19.1848 23.5598 18.625 24.25 18.625C24.9402 18.625 25.5 19.1848 25.5 19.875C25.5 20.5652 24.9402 21.125 24.25 21.125Z" />
        </S.ContasFundoRedondo>
    );
}

export default ContasFundoRedondo;