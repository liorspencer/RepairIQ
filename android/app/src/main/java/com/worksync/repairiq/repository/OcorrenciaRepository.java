package com.worksync.repairiq.repository;

import com.worksync.repairiq.model.OcorrenciaModel;
import java.util.ArrayList;
import java.util.List;

public class OcorrenciaRepository {
    private static final List<OcorrenciaModel> listaOcorrencias = new ArrayList<>();

    public static void adicionar(OcorrenciaModel ocorrencia) {
        listaOcorrencias.add(ocorrencia);
    }

    public static List<OcorrenciaModel> getTodas() {
        return new ArrayList<>(listaOcorrencias);
    }

    public static void limpar() {
        listaOcorrencias.clear();
    }
}
