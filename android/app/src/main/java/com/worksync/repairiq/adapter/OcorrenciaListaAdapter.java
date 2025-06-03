package com.worksync.repairiq.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.worksync.repairiq.R;
import com.worksync.repairiq.model.OcorrenciaModel;

import java.util.List;

public class OcorrenciaListaAdapter extends RecyclerView.Adapter<OcorrenciaListaAdapter.ViewHolder> {

    private Context context;
    private List<OcorrenciaModel> lista;

    public OcorrenciaListaAdapter(Context context, List<OcorrenciaModel> lista) {
        this.context = context;
        this.lista = lista;
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvId, tvEquipamento, tvPrioridade, tvStatus, tvDataHora, tvDescricao;

        public ViewHolder(View itemView) {
            super(itemView);
            tvId = itemView.findViewById(R.id.et_item_ocorrencia_id);
            tvEquipamento = itemView.findViewById(R.id.et_item_ocorrencia_tag);
            tvPrioridade = itemView.findViewById(R.id.tv_prioridade);
            tvStatus = itemView.findViewById(R.id.et_item_ocorrencia_status);
            tvDataHora = itemView.findViewById(R.id.tv_data_abertura);
            tvDescricao = itemView.findViewById(R.id.tv_descricao);
        }
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_ocorrencia, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        OcorrenciaModel item = lista.get(position);
        holder.tvId.setText("ID #" + item.getId());
        holder.tvEquipamento.setText("Equipamento: " + item.getEquipamento());
        holder.tvPrioridade.setText("Prioridade: " + item.getPrioridade().toString());
        holder.tvStatus.setText("Status: " + item.getStatus().toString());
        holder.tvDataHora.setText("Data: " + item.getDataHora());
        holder.tvDescricao.setText("Descrição: " + item.getDescricao());
    }

    @Override
    public int getItemCount() {
        return lista != null ? lista.size() : 0;
    }
}
