import * as React from "react";
import { format } from "date-fns";
import { DeliveryModel } from "-/services/types";
import { Bold, P, SignatureImage } from "./styles";

interface Props {
  delivery?: DeliveryModel;
}

const DeliveryModal: React.FC<Props> = ({ delivery }) => {
  if (!delivery) {
    return null;
  }
  const { start_date, end_date, recipient, signature } = delivery;
  const { street, number, city, state, cep } = recipient;
  const formatedStartDate = start_date
    ? format(new Date(start_date), "dd/MM/yyyy")
    : "<Pendente>";
  const formatedEndDate = end_date
    ? format(new Date(end_date), "dd/MM/yyyy")
    : "<Pendente>";
  return (
    <>
      <Bold>Informações da encomenda</Bold>
      <P>
        {street}, {number}
      </P>
      <P>
        {city} - {state}
      </P>
      <P>{cep}</P>
      <br />
      <Bold>Datas</Bold>
      <P>
        <Bold>Retirada</Bold>: {formatedStartDate}
      </P>
      <P>
        <Bold>Entrega</Bold>: {formatedEndDate}
      </P>
      <br />
      <Bold>Assinatura do Destinatário</Bold>
      {signature && signature.path ? (
        <SignatureImage src={`http://localhost:1234/files/${signature.path}`} />
      ) : (
        <P>{"<Pendende>"}</P>
      )}
    </>
  );
};

export default DeliveryModal;
