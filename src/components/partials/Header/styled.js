import styled from 'styled-components';

export const HeaderArea = styled.div`
    height:60px;
    background-color:#FFF;
    border-bottom:1px solid #CCC

    .container{
        max-width: 1000px;
        margin:auto;
        display:flex;
    }

    a{
        text-decoration:none;
    }

    .logo{
        flex:1;
        display:flex;
        align-items:center;
        height:60px;

        .logo-1,
        .logo-2,
        .logo-3 {
            font-size:27px;
            font-weight:bold;
        }
        .logo-1{ color:#FF0000; }
        .logo-2{ color:#00FF00; }
        .logo-3{ color:#0000FF; }
    }

    nav{
        padding: 10px 0;

        ul, li {
            margin:0;
            padding:0;
            list-style:none;
        }

        ul {
            display:flex;
            align-items:center;
            height: 40px;
        }

        li {
            margin-left: 20px;
            margin-right: 20px;

            a, button {
                color: #000;
                font-size:14px;
                border: 0;
                background: none;
                cursor:pointer; 
                outline:0;

                &:hover {
                    color:#999;
                }

                &.button {
                    background-color:#FF8100;
                    border-radius: 4px;
                    color:#FFF;
                    padding:5px 10px;

                    &:hover{
                        background-color: #E57706;
                    }
                }
            }
        }
    }
`;