import styled from 'styled-components';

export const SearchArea = styled.div`
    background-color:#DDD;
    border-bottom: 1px solid #CCC;
    padding: 30px 0 ;

    .searchBox{
        background-color: #9BBB3C;
        padding:20px 15px;
        border-radius:10px;
        box-shadow: 1px 1px 1px 0.4px rgba(0,0,0,0.2);
        display: flex;

        form{
            flex: 1;
            display: flex;

            input, select {
                height: 40px;
                border: 0;
                border-radius:5px;
                outline:0;  
                font-size:15px;
                color:#000;
                margin-right: 20px;
            }
            input{
                flex: 1;
                padding: 0 10px;
            }
            select{
                padding: 10px;
            }

            button {
                background-color: #49AEEF;
                font-size:15px;
                border:0;
                border-radius:5px;
                color:#FFF;
                padding: 0 20px;
                height: 40px;
            }
        }
    }
`;

export const PageArea = styled.div`

`;