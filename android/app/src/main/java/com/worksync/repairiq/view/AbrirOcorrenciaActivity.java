package com.worksync.repairiq.view;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.button.MaterialButton;
import com.worksync.repairiq.R;
import com.worksync.repairiq.adapter.FotoAdapter;
import com.worksync.repairiq.constants.Prioridade;
import com.worksync.repairiq.constants.StatusOcorrencia;
import com.worksync.repairiq.model.OcorrenciaModel;
import com.worksync.repairiq.repository.OcorrenciaRepository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.TimeZone;

public class AbrirOcorrenciaActivity extends AppCompatActivity {

    private static final int PERMISSION_REQUEST_CODE = 100;

    private RecyclerView rvFotos;
    private FotoAdapter fotoAdapter;
    private ImageButton ibFechar;
    private EditText etDescricao;
    private Spinner spEquipamento;
    private RadioGroup rgPrioridade;
    private MaterialButton mbAdicionarFoto, mbAbrirOcorrencia;
    private List<Uri> listaFotos = new ArrayList<>();
    private ActivityResultLauncher<Intent> galleryLauncher;

    private int proximoId = 1; // exemplo inicial, gerencie conforme seu repositório

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_abrir_ocorrencia);

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        spEquipamento = findViewById(R.id.sp_equipamento2);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(
                this,
                R.array.equipamentos_array,
                android.R.layout.simple_spinner_item
        );
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spEquipamento.setAdapter(adapter);

        etDescricao = findViewById(R.id.et_os); // corrigido para o EditText correto
        rgPrioridade = findViewById(R.id.rg_prioridade);
        mbAdicionarFoto = findViewById(R.id.b_adicionar_fotos2);
        mbAbrirOcorrencia = findViewById(R.id.b_abrir_os);
        ibFechar = findViewById(R.id.ib_close);

        rvFotos = findViewById(R.id.rv_fotos);
        rvFotos.setLayoutManager(new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false));

        fotoAdapter = new FotoAdapter(this, listaFotos, uri -> {
            listaFotos.remove(uri);
            fotoAdapter.notifyDataSetChanged();
            checarLista();
            Toast.makeText(AbrirOcorrenciaActivity.this, "Foto removida", Toast.LENGTH_SHORT).show();
        });
        rvFotos.setAdapter(fotoAdapter);

        galleryLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                        Uri selectedImageUri = result.getData().getData();
                        if (selectedImageUri != null) {
                            listaFotos.add(selectedImageUri);
                            checarLista();
                            fotoAdapter.notifyDataSetChanged();
                        }
                    }
                }
        );

        mbAdicionarFoto.setOnClickListener(v -> checarPermissao());
        mbAbrirOcorrencia.setOnClickListener(v -> abrirOcorrencia());
        ibFechar.setOnClickListener(v -> finalizar());
    }




    private void abrirOcorrencia() {
        String descricao = etDescricao.getText().toString().trim();
        String equipamento = spEquipamento.getSelectedItem() != null ? spEquipamento.getSelectedItem().toString() : "";

        int selectedId = rgPrioridade.getCheckedRadioButtonId();
        if (selectedId == -1) {
            Toast.makeText(this, "Selecione a prioridade", Toast.LENGTH_SHORT).show();
            return;
        }

        RadioButton selectedRadio = findViewById(selectedId);
        String prioridadeStr = selectedRadio.getText().toString().toUpperCase();

        if (descricao.isEmpty() || equipamento.isEmpty()) {
            Toast.makeText(this, "Preencha todos os campos", Toast.LENGTH_SHORT).show();
            return;
        }

        Prioridade prioridadeEnum;
        try {
            prioridadeEnum = Prioridade.valueOf(prioridadeStr);
        } catch (IllegalArgumentException e) {
            Toast.makeText(this, "Prioridade inválida", Toast.LENGTH_SHORT).show();
            return;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault());
        sdf.setTimeZone(TimeZone.getTimeZone("America/Sao_Paulo"));
        String dataHora = sdf.format(new Date());


        OcorrenciaModel novaOcorrencia = new OcorrenciaModel(
                proximoId++,
                descricao,
                equipamento,
                prioridadeEnum,
                StatusOcorrencia.ESPERANDO_ACAO,
                dataHora,
                new ArrayList<>(listaFotos)
        );

        OcorrenciaRepository.adicionar(novaOcorrencia);
        Toast.makeText(this, "Ocorrência aberta com sucesso!", Toast.LENGTH_SHORT).show();
        finalizar();
    }

    private void finalizar() {
        finish();
    }

    private void checarPermissao() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            // Android 13+ (API 33+)
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.READ_MEDIA_IMAGES},
                        PERMISSION_REQUEST_CODE);
            } else {
                abrirGaleria();
            }
        } else {
            // Android 27 a 32
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this,
                        new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                        PERMISSION_REQUEST_CODE);
            } else {
                abrirGaleria();
            }
        }
    }

    private void checarLista() {
        if (!listaFotos.isEmpty()){
            rvFotos.setVisibility(RecyclerView.VISIBLE);
        } else {
            rvFotos.setVisibility(RecyclerView.GONE);
        }
    }

    // Trata a resposta da permissão
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                abrirGaleria();
            } else {
                Toast.makeText(this, "Permissão negada para acessar imagens", Toast.LENGTH_SHORT).show();
            }
        }
    }

    private void abrirGaleria() {

        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setDataAndType(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, "image/*");
        galleryLauncher.launch(intent);
    }

}