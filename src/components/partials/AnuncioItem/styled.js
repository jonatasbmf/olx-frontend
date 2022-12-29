import styled from "styled-components";

export const Item = styled.div`
    a {
        background-color:#FFF;
        border: 1px solid #FFF;
        display:block;
        margin:10px;
        text-decoration:none;
        padding:10px;
        border-radius:5px;
        color:#000;       
        transition:all ease .2s; 

        &:hover{            
            border: 1px solid #CCC;
            background-color:#EEE;
        }

        .itemImage img {
            width:100%;
            border-radius:5px;
        }

        .itemName {
            font-weight:bold;
        }
    }
`;