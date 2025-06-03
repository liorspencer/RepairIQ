package com.worksync.repairiq.view;

import android.net.Uri;
import android.os.Bundle;
import android.widget.ImageButton;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.worksync.repairiq.R;
import com.worksync.repairiq.adapter.OcorrenciaAdapter;
import com.worksync.repairiq.adapter.OcorrenciaListaAdapter;
import com.worksync.repairiq.constants.Prioridade;
import com.worksync.repairiq.model.OcorrenciaModel;
import com.worksync.repairiq.repository.OcorrenciaRepository;

import java.util.ArrayList;
import java.util.List;

public class ListaOcorrenciaActivity extends AppCompatActivity {

    private RecyclerView recyclerView;
    private ImageButton ibFechar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_lista_ocorrencia);

        recyclerView = findViewById(R.id.rv_lista_ocorrencia);
        ibFechar = findViewById(R.id.ib_close);

        recyclerView.setLayoutManager(new LinearLayoutManager(this));


        List<OcorrenciaModel> listaOcorrencias = OcorrenciaRepository.getTodas();
        OcorrenciaListaAdapter adapter = new OcorrenciaListaAdapter(this, listaOcorrencias);
        recyclerView.setAdapter(adapter);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        ibFechar.setOnClickListener(v -> finalizar());
    }

    private void finalizar() {
        finish();
    }
}
