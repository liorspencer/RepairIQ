package com.worksync.repairiq.view;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.worksync.repairiq.ListaOcorrenciaActivity;
import com.worksync.repairiq.R;

public class MenuPrincipalActivity extends AppCompatActivity {

    private Button bAbrirOcorrencia, bAbrirOs, bListaOs, bListaOcorrencia, bConfiguracao, bConsultarOs, bSair;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tela_principal);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // Referências dos botões
        bAbrirOcorrencia = findViewById(R.id.buttonAbrirOcorrencia);
        bAbrirOs = findViewById(R.id.buttonAbiriOs);
        bListaOs = findViewById(R.id.buttonListaOs);
        bListaOcorrencia = findViewById(R.id.buttonListaOcorrencia);
        bConfiguracao = findViewById(R.id.buttonConfiguacao);
        bConsultarOs = findViewById(R.id.buttonConsultarOs);
        bSair = findViewById(R.id.buttonSair);

        // Ações dos botões
        bAbrirOcorrencia.setOnClickListener(v -> {
            Intent intent = new Intent(this, AbrirOcorrenciaActivity.class);
            startActivity(intent);
        });

        bAbrirOs.setOnClickListener(v -> {
            Intent intent = new Intent(this, AbrirOs.class);
            startActivity(intent);
        });

        bListaOcorrencia.setOnClickListener(v -> {
            Intent intent = new Intent(this, ListaOcorrenciaActivity.class);
            startActivity(intent);
        });

        bConfiguracao.setOnClickListener(v -> {
            Intent intent = new Intent(this, Configuracoes.class);
            startActivity(intent);
        });

        bSair.setOnClickListener(v -> {
            finishAffinity(); // Encerra todas as atividades e sai do app
        });

        bConsultarOs.setOnClickListener(view -> {
            Intent intent = new Intent(this, GerenciarOS.class);
            startActivity(intent);
        });
    }
}
