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
    private String descricao;
    private Prioridade prioridade;
    private List<Uri> fotos;
    private StatusOcorrencia status;
    private String dataHora;


    public OcorrenciaModel(int id, String descricao, String equipamento, Prioridade prioridade, StatusOcorrencia status, String dataHora, List<Uri> fotos) {
        this.id = id;
        this.descricao = descricao;
        this.equipamento = equipamento;
        this.prioridade = prioridade;
        this.status = status;
        this.dataHora = dataHora;
        this.fotos = fotos;
    }

    // Getter e setter para descricao
    public String getDescricao() { return descricao; }

    public int getId() { return id; }

    public String getOcorrencia() { return ocorrencia; }

    public String getEquipamento() { return equipamento; }

    public Prioridade getPrioridade() { return prioridade; }

    public StatusOcorrencia getStatus() { return status; }

    public String getDataHora() { return dataHora; }

    public List<Uri> getFotos() { return fotos; }

    // Setters (opcional, se precisar alterar)
    public void setStatus(StatusOcorrencia status) {
        this.status = status;
    }

    public void setFotos(List<Uri> fotos) {
        this.fotos = fotos;
    }
}
