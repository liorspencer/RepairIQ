package com.worksync.repairiq.model;

import android.net.Uri;

import com.worksync.repairiq.constants.Prioridade;
import com.worksync.repairiq.constants.StatusOcorrencia;

import java.io.Serializable;
import java.util.List;

public class OcorrenciaModel implements Serializable {
    private int id;
    private String ocorrencia;
    private String equipamento;
    private Prioridade prioridade;
    private List<Uri> fotos;
    private StatusOcorrencia status;
    public OcorrenciaModel(int id, String ocorrencia, String equipamento, Prioridade prioridade, List<Uri> fotos) {
        this.id = id;
        this.ocorrencia = ocorrencia;
        this.equipamento = equipamento;
        this.prioridade = prioridade;
        this.fotos = fotos;
        this.status = StatusOcorrencia.ESPERANDO_ACAO;
    }

}
